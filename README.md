🙃

## Getting Started with Backend

## First, run the development server:

---

### First create a Redis instence on https://railway.app/

```bash
cd server
```

```bash
cp .env.sample .env
```

and then paste the Redis connection string in .env file

```bash
npm install
# or
yarn
```

```bash
npx prisma npx prisma migrate dev -n Init
```

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:4000/graphql](http://localhost:4000/graphql) with your browser to see the result.

You can start editing the page by modifying `src/server.ts`. The page auto-updates as you edit the file.

---

## Getting Started with front end

First, run the development server:

```bash
cd client
```

```bash
cp .env.sample .env
```

```bash
npm install
# or
yarn
```

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

and then sign up and login add a post hah

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.
