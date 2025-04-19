import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const promptEngineer = (data: any[]) => \`You are an AI assistant. Based on the following ChatGPT conversation snippets, extract key projects and categorize them. Provide a JSON with the following structure:

{
  "projects": [
    {
      "title": "Project Name",
      "category": "Work" | "Personal" | "Other",
      "summary": "Short summary",
      "nextStep": "Actionable next step"
    }
  ],
  "summary": {
    "topPriorities": "...",
    "prepTasks": "...",
    "thoughts": "..."
  }
}

Data:
\${JSON.stringify(data.slice(0, 5))}\`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, apiKey } = req.body

    if (!apiKey || !apiKey.startsWith('sk-')) {
      return res.status(400).send('Missing or invalid OpenAI API key.')
    }

    const openai = new OpenAI({ apiKey })

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: promptEngineer(data) }],
      model: 'gpt-4-turbo'
    })

    const parsed = JSON.parse(response.choices[0].message.content)
    res.status(200).json(parsed)
  } catch (error) {
    console.error('API error:', error)
    res.status(500).send('Failed to process chat data.')
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
