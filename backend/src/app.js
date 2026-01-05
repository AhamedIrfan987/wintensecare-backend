const express = require('express');
const cors = require('cors');

const telemetryRoutes = require('./routes/telemetry.routes');


const alertRoutes = require('./routes/alerts.routes');
const healthRoutes = require('./routes/health.routes');

const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

const devicesRoutes = require('./routes/devices.routes');


const app = express();
app.use(cors({ origin: '*' }));

app.use(cors());
app.use(express.json());


app.use('/alerts', alertRoutes);

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

app.use('/telemetry', telemetryRoutes);


app.use('/health', healthRoutes);
app.use('/devices', devicesRoutes);


module.exports = app;
