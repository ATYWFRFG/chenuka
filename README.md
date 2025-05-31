# V2Ray Simple Panel

A minimal Node.js panel with user registration and login.

## Install & Run

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
cp .env.example .env
# Edit .env and set JWT_SECRET
npm start
```

## API

- `POST /api/auth/register` { email, password }
- `POST /api/auth/login` { email, password }

## License

MIT
