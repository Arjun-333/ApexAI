# ApexAI - AI Fitness Assistant

ApexAI is an intelligent, full-stack fitness application that delivers personalized workout plans, nutrition guidance, and progress analytics. It leverages an LLM-integrated recommendation engine to adapt to your specific fitness profile and goals.

## Features

- **Personalized Workout Generation**: Professional 4-week protocols with progressive overload.
- **Precision Nutrition**: Calorie and macro target calculations based on user biometrics.
- **Fitness Assistant**: Context-aware chat assistant for fitness Q&A.
- **Evolution Analytics**: Visual progress tracking and biometric trends.
- **Premium UI**: Modern, professional dark theme built for elite performance.

## Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (React, TypeScript, Tailwind CSS)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **AI Engine**: [OpenAI GPT-4o-mini](https://openai.com/)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Deployment**: [Docker](https://www.docker.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Docker (optional)

### Quick Start with Docker

1. Clone the repository.
2. Create a `.env` file in the root:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/fitness_db
   OPENAI_API_KEY=your_openai_api_key
   SECRET_KEY=your_jwt_secret_key
   ALLOWED_ORIGINS=http://localhost:3000
   ```
3. Run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

### Manual Setup

#### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## License

This project is licensed under the MIT License.
