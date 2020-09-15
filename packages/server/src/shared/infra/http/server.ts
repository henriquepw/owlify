import '@config/bootstrap';

import app from './app';

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server online on port ${PORT} 🚀`));
