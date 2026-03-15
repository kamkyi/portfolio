const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";

const PORTFOLIO_CONTEXT = `
Name: Wai Hyn Htun
Role: Senior Full-Stack and Mobile Developer
Location: Thailand

Professional summary:
- Senior developer with 12+ years of experience across nonprofit, mobility, travel, and enterprise software.
- Primary strengths: Python, React, and PHP.
- Additional strengths: React Native, Expo, Node.js, Express, Django, Laravel, MySQL, MongoDB, AWS, Go, Firebase, microservice architecture, API design, performance optimization.
- Product-minded and delivery-focused, comfortable moving between frontend UX details and backend architecture.

Recent and notable work:
- Issara Organization (2021 to present), Senior Full-Stack Developer.
- Works on nonprofit systems that support worker safety, labor monitoring, and digital services for migrant communities.
- Supports Golden Dreams and related labor-focused systems serving 70k+ users.
- Contributes across React, Node.js, Express, Django, Firebase, backend services, dashboards, workflows, and worker-facing product experiences.

Previous roles:
- Yoma Strategic Holdings (2018 to 2021), Senior Software Engineer. Built mobility and operational products for car sharing, rental workflows, employee financing, IoT-aware flows, billing, booking, and reliability improvements.
- Oway Travels and Tours (2017 to 2018), Product Owner / Software Development Engineer. Worked on travel booking systems at 2M+ user scale, APIs, integrations, search optimization, payment-enabled flows, AWS, MySQL, MongoDB, Go, and Python.
- Myanmar Digital Solutions (2014 to 2017), Web Developer. Built internal systems, responsive interfaces, and early mobile-related product work.

Work style and positioning:
- Strong fit for product engineering roles requiring calm cross-functional delivery.
- Comfortable with web, mobile, backend, integrations, and production-minded iteration.
- Open to product engineering roles, freelance work, and collaborations.

Public contact details:
- Email: waihynhtun90s@gmail.com
- Phone/WhatsApp: +66 94 712 4485
- LinkedIn: linkedin.com/in/wai-hyn-htun-67180b115/
- GitHub: github.com/kamkyi
`.trim();

const AGENT_INSTRUCTIONS = `
You are the AI portfolio and resume assistant on Wai Hyn Htun's website.

Your job has two modes:
1. Portfolio mode: answer questions about Wai Hyn Htun accurately and professionally using the portfolio context provided below and file search results if available.
2. Resume coach mode: help the website visitor generate resume content for themselves when they ask for it.

Rules:
- Be concise, professional, and credibility-focused.
- Do not invent facts, employers, years, metrics, certifications, or contact details.
- Make a clear distinction between Wai Hyn Htun and the website visitor.
- If a question about Wai Hyn is not supported by the provided context or file search, say that directly.
- If the visitor asks for resume help and key details are missing, ask only the smallest set of follow-up questions needed.
- When drafting a visitor resume, prefer practical output such as a headline, a short summary, role bullets, and a skills section.
- If the visitor asks whether Wai Hyn is a fit for a role, map his experience to that role explicitly.
- Keep answers useful for hiring conversations and portfolio Q and A.

Portfolio context:
${PORTFOLIO_CONTEXT}
`.trim();

const json = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
};

const readBody = async (req) => {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string" && req.body) {
    return JSON.parse(req.body);
  }

  let rawBody = "";

  for await (const chunk of req) {
    rawBody += chunk;
  }

  if (!rawBody) {
    return {};
  }

  return JSON.parse(rawBody);
};

const sanitizeMessages = (messages) => {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message) => {
      if (!message || typeof message !== "object") {
        return false;
      }

      const isValidRole =
        message.role === "user" || message.role === "assistant";
      const isValidContent =
        typeof message.content === "string" && message.content.trim();

      return isValidRole && isValidContent;
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: [
        {
          type: "input_text",
          text: message.content.trim(),
        },
      ],
    }));
};

const extractOutputText = (responseData) => {
  if (
    responseData &&
    typeof responseData.output_text === "string" &&
    responseData.output_text.trim()
  ) {
    return responseData.output_text.trim();
  }

  if (!responseData || !Array.isArray(responseData.output)) {
    return "";
  }

  const segments = [];

  responseData.output.forEach((item) => {
    if (!item || item.type !== "message" || !Array.isArray(item.content)) {
      return;
    }

    item.content.forEach((part) => {
      if (!part || typeof part !== "object") {
        return;
      }

      if (part.type === "output_text" && typeof part.text === "string") {
        segments.push(part.text);
      }

      if (part.type === "text" && typeof part.text === "string") {
        segments.push(part.text);
      }
    });
  });

  return segments.join("\n\n").trim();
};

const extractSources = (responseData) => {
  if (!responseData || !Array.isArray(responseData.output)) {
    return [];
  }

  const sources = [];

  responseData.output.forEach((item) => {
    if (
      !item ||
      item.type !== "file_search_call" ||
      !Array.isArray(item.results)
    ) {
      return;
    }

    item.results.forEach((result) => {
      if (!result || typeof result !== "object") {
        return;
      }

      const filename =
        typeof result.filename === "string" ? result.filename : null;

      if (filename) {
        sources.push({
          filename,
          score:
            typeof result.score === "number"
              ? Number(result.score.toFixed(3))
              : null,
        });
      }
    });
  });

  return sources;
};

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Method not allowed. Use POST." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return json(res, 503, {
      error:
        "Missing OPENAI_API_KEY. Deploy this site with a server runtime and set the OpenAI environment variable.",
    });
  }

  try {
    const body = await readBody(req);
    const messages = sanitizeMessages(body.messages);

    if (!messages.length) {
      return json(res, 400, { error: "No valid chat messages were provided." });
    }

    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
    const payload = {
      model: DEFAULT_MODEL,
      instructions: AGENT_INSTRUCTIONS,
      input: messages,
      max_output_tokens: 700,
    };

    if (vectorStoreId) {
      payload.tools = [
        {
          type: "file_search",
          vector_store_ids: [vectorStoreId],
          max_num_results: 4,
        },
      ];
      payload.include = ["file_search_call.results"];
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null);
      const apiMessage =
        errorPayload &&
        errorPayload.error &&
        typeof errorPayload.error.message === "string"
          ? errorPayload.error.message
          : "OpenAI request failed.";

      return json(res, response.status, { error: apiMessage });
    }

    const responseData = await response.json();
    const reply = extractOutputText(responseData);

    if (!reply) {
      return json(res, 502, {
        error: "The assistant response did not contain readable text output.",
      });
    }

    return json(res, 200, {
      reply,
      sources: extractSources(responseData),
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message.trim()
        ? error.message.trim()
        : "Unexpected server error.";

    return json(res, 500, { error: message });
  }
};
