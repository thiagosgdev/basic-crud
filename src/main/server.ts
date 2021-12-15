import { connection } from "@/infra/db/postgres/helpers/typeorm";

connection
    .init()
    .then(async () => {
        const app = (await import("./config/app")).default;
        app.listen(3001, () =>
            console.log(`Server running at http://localhost:3001`),
        );
    })
    .catch(console.error);
