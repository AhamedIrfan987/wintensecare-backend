--
-- PostgreSQL database dump
--

\restrict 3M1zriLH9ikDLQly4t3U3GKheyntasZw2dtXwVqwi7aI6XlECzPivCg00RicRla

-- Dumped from database version 15.15 (Debian 15.15-1.pgdg13+1)
-- Dumped by pg_dump version 15.15 (Debian 15.15-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Alert; Type: TABLE; Schema: public; Owner: wintense
--

CREATE TABLE public."Alert" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "deviceId" text NOT NULL,
    metric text NOT NULL,
    value integer NOT NULL,
    severity text NOT NULL,
    message text NOT NULL,
    acknowledged boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Alert" OWNER TO wintense;

--
-- Name: Device; Type: TABLE; Schema: public; Owner: wintense
--

CREATE TABLE public."Device" (
    id text NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Device" OWNER TO wintense;

--
-- Name: ECG; Type: TABLE; Schema: public; Owner: wintense
--

CREATE TABLE public."ECG" (
    id text NOT NULL,
    "deviceId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "durationMs" integer NOT NULL,
    "samplingRate" integer NOT NULL,
    signal double precision[],
    gain integer DEFAULT 10 NOT NULL,
    lead text DEFAULT 'I'::text NOT NULL,
    "paperSpeed" integer DEFAULT 25 NOT NULL,
    quality integer DEFAULT 50 NOT NULL,
    unit text DEFAULT 'mV'::text NOT NULL
);


ALTER TABLE public."ECG" OWNER TO wintense;

--
-- Name: ECGSummary; Type: TABLE; Schema: public; Owner: wintense
--

CREATE TABLE public."ECGSummary" (
    id text NOT NULL,
    "deviceId" text NOT NULL,
    "window" text NOT NULL,
    "avgHR" integer NOT NULL,
    "minHR" integer NOT NULL,
    "maxHR" integer NOT NULL,
    "rrVar" double precision NOT NULL,
    "pvcCount" integer NOT NULL,
    quality integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ECGSummary" OWNER TO wintense;

--
-- Name: SpO2Sample; Type: TABLE; Schema: public; Owner: wintense
--

CREATE TABLE public."SpO2Sample" (
    id text NOT NULL,
    "deviceId" text NOT NULL,
    value integer NOT NULL,
    perfusion integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."SpO2Sample" OWNER TO wintense;

--
-- Name: Telemetry; Type: TABLE; Schema: public; Owner: wintense
--

CREATE TABLE public."Telemetry" (
    id text NOT NULL,
    "deviceId" text NOT NULL,
    "heartRate" integer NOT NULL,
    steps integer NOT NULL,
    battery integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Telemetry" OWNER TO wintense;

--
-- Name: User; Type: TABLE; Schema: public; Owner: wintense
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text,
    password text NOT NULL,
    role text DEFAULT 'user'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    phone text
);


ALTER TABLE public."User" OWNER TO wintense;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: wintense
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO wintense;

--
-- Data for Name: Alert; Type: TABLE DATA; Schema: public; Owner: wintense
--

COPY public."Alert" (id, "userId", "deviceId", metric, value, severity, message, acknowledged, "createdAt") FROM stdin;
afbe749e-e4cc-40ed-a9a9-298a60f70862	a279d9b2-fec2-4db6-921c-155290ef75c9	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	HEART_RATE	190	CRITICAL	Sustained high heart rate detected	f	2025-12-18 08:03:41.918
f3d7cd88-cba0-4056-8653-8530582611a7	a279d9b2-fec2-4db6-921c-155290ef75c9	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	HEART_RATE	797	WARNING	Elevated heart rate detected	f	2025-12-18 08:04:12.723
8c0127ed-1f8c-4119-a6a1-944758f19dfa	a279d9b2-fec2-4db6-921c-155290ef75c9	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	BATTERY	4	WARNING	Device battery is low	f	2025-12-18 08:04:12.744
9469805f-392f-417c-9dc5-70b128685840	cd0c2813-5c42-48c2-84cb-59643aced6b9	063bb4e3-2654-4a5d-a0db-8b8e35306d69	HEART_RATE	190	WARNING	Elevated heart rate detected	t	2025-12-18 10:03:34.823
ac75b137-96b2-455f-92e9-b75323dcf805	cd0c2813-5c42-48c2-84cb-59643aced6b9	063bb4e3-2654-4a5d-a0db-8b8e35306d69	BATTERY	8	WARNING	Device battery is low	t	2025-12-18 10:03:17.796
e1a1bd14-5229-4664-9251-fafc2e359a61	cd0c2813-5c42-48c2-84cb-59643aced6b9	063bb4e3-2654-4a5d-a0db-8b8e35306d69	HEART_RATE	190	CRITICAL	Sustained high heart rate detected	t	2025-12-18 10:02:41.447
c99e7cc1-2d0b-42d5-b00e-14984f215b62	cd0c2813-5c42-48c2-84cb-59643aced6b9	063bb4e3-2654-4a5d-a0db-8b8e35306d69	HEART_RATE	290	CRITICAL	Sustained high heart rate detected	f	2025-12-18 10:25:24
a0f1c92a-23ae-4bd2-bddc-e4bb774a3d3f	24455c80-6f92-42e6-bfb2-b5850350ca93	7d842d84-f2fa-4f7c-9be5-d5d55d7c48cc	HEART_RATE	170	WARNING	Elevated heart rate detected	f	2025-12-18 11:13:40.667
cba1646b-07ef-4634-b7dd-4c8ce052ebda	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	180	WARNING	Elevated heart rate detected	t	2025-12-22 07:34:57.492
92f9e614-a139-4751-a92c-ed639cf56c92	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	230	WARNING	Elevated heart rate detected	t	2025-12-23 06:29:11.117
e89881ef-bb47-4221-91e5-aab4bec94b50	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	190	CRITICAL	Sustained high heart rate detected	t	2025-12-24 04:40:14.858
675ec2a4-ecf4-4245-b386-ad5d8cd39659	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	175	WARNING	Elevated heart rate detected	t	2025-12-24 04:40:24.307
9f04fb56-23e5-4433-ba15-3f10d5c9a5dc	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	290	CRITICAL	Sustained high heart rate detected	t	2025-12-24 04:42:43.639
ba91df1f-759a-4c56-90ef-6202b33ec840	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	190	CRITICAL	Sustained high heart rate detected	t	2025-12-24 05:57:42.976
d8b9c6bc-c7d3-4e49-be48-891fe0806d44	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	190	CRITICAL	Sustained high heart rate detected	t	2025-12-24 07:23:03.718
f909a340-74d0-43ce-b5d4-24d86c22d3d5	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	190	CRITICAL	Sustained high heart rate detected	t	2025-12-24 09:58:22.655
bbfdff27-e3e9-4c58-a6d6-9ab499b35289	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	165	WARNING	Elevated heart rate detected	t	2025-12-24 07:23:15.993
b3068421-13d6-4747-bf25-59a2dbe10533	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	BATTERY	5	WARNING	Device battery is low	t	2025-12-29 10:32:43.946
a84575e3-961c-4970-b4fd-06c987163660	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	180	WARNING	Elevated heart rate detected	t	2025-12-29 10:32:54.195
d71a7aca-cc18-4f43-94f3-a04141c86988	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	180	WARNING	Elevated heart rate detected	t	2025-12-30 07:09:28.857
e30152cb-3c1b-40db-8ffe-e260401cb059	1352fde5-9aa4-4c78-9356-946208a6000a	4ab1e27b-aa94-4896-a517-8d0b2dd7c609	HEART_RATE	170	WARNING	Elevated heart rate detected	f	2026-01-06 07:09:09.837
ba63d501-8fee-443f-9320-418a9db74362	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	BATTERY	5	WARNING	Device battery is low	t	2026-01-06 08:01:51.002
9142eb46-daba-4417-8ae9-61683b4d75ab	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	155	WARNING	Elevated heart rate detected	t	2026-01-05 10:38:04.358
4395ae47-163f-487f-aed8-acc8be8b8860	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	190	CRITICAL	Sustained high heart rate detected	t	2025-12-26 07:06:03.987
6d9e28c5-df2c-4034-b731-d46c4619888d	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	190	WARNING	Elevated heart rate detected	t	2026-01-06 10:34:19.17
e97247b8-4ac5-4010-aada-3244a3a7101c	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	HEART_RATE	190	WARNING	Elevated heart rate detected	t	2026-01-06 10:39:03.35
ac5f61fa-8f2c-4060-aa68-b777daa595b0	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	b602ed12-f3ff-4b25-9838-ff81f4b8de50	BATTERY	5	WARNING	Device battery is low	t	2026-01-06 10:34:19.175
4122ddf2-d8af-458c-9d23-9862997cee9d	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	190	CRITICAL	Sustained high heart rate detected	t	2026-01-09 09:04:29.859
551cfd2d-8ef5-46be-88e4-eb80c63eb9d4	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	197	WARNING	Elevated heart rate detected	t	2026-01-09 09:04:38.1
ca9613ce-e6f0-4e0f-a1dc-3d489aec0d26	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	233	WARNING	Elevated heart rate detected	t	2026-01-10 07:23:51.714
84d68bd5-9612-4aed-a7f0-361caf4d5e58	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	253	WARNING	Elevated heart rate detected	t	2026-01-10 07:25:57.788
f37f9a9e-278c-4b09-8405-11e6fde3fa7b	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	270	WARNING	Elevated heart rate detected	t	2026-01-10 07:26:31.022
282cd525-a1f5-47cb-b0e9-d1b96b774e3d	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	253	WARNING	Elevated heart rate detected	t	2026-01-10 07:27:36.584
b033e868-cdd7-46ae-839d-360ba1a05065	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	BATTERY	5	WARNING	Device battery is low	t	2026-01-10 06:26:05.666
e8c6b8f5-1165-46aa-9b04-9f2109da8cad	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	171	WARNING	Elevated heart rate detected	t	2026-01-10 07:31:54.756
356c9ab9-fe9d-4268-b7b1-b2b78e69a4bd	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	256	WARNING	Elevated heart rate detected	t	2026-01-10 07:27:53.337
4bdbd222-2d2e-4ed4-b191-f43a2db714a9	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	BATTERY	3	WARNING	Device battery is low	t	2026-01-10 07:31:54.767
bc20a3f4-3375-430c-9d85-99a957ac0198	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	186	WARNING	Elevated heart rate detected	t	2026-01-10 07:33:02.125
2bef5e74-feb4-422c-a62c-24103850f2e9	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	195	WARNING	Elevated heart rate detected	t	2026-01-10 07:47:54.818
31d44f95-e419-428e-964f-3ead84aa8539	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	200	WARNING	Elevated heart rate detected	t	2026-01-10 07:48:11.916
e5240aee-9325-4407-afdd-76a450a14dcb	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	205	WARNING	Elevated heart rate detected	t	2026-01-10 07:54:44.688
f1a60d44-2ba6-4c0d-8e9d-73dd25cffec1	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	BATTERY	0	WARNING	Device battery is low	t	2026-01-10 07:54:54.79
588a4e37-90ba-4f0a-b967-a119dfef5ced	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	160	WARNING	Elevated heart rate detected	t	2026-01-12 10:50:43.847
84853b00-b695-4b32-9405-6d52cc70f2f6	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	170	WARNING	Elevated heart rate detected	t	2026-01-12 10:51:34.428
165b759b-e61b-4bb9-8998-ea7b026cc3b5	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	BATTERY	5	WARNING	Device battery is low	t	2026-01-12 10:52:09.737
01cf064d-c192-4834-99f1-6f705e7b5f5f	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	190	CRITICAL	Sustained high heart rate detected	t	2026-01-13 05:57:31.123
cfc47b4d-2be2-4776-b8a9-1d90ddde6420	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	190	CRITICAL	Sustained high heart rate detected	t	2026-01-13 12:23:43.053
d420018c-dc7e-422e-8bda-8eeb43c207a5	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	190	WARNING	Elevated heart rate detected	t	2026-01-13 06:01:47.939
61f64eeb-f657-440d-aaef-257a20e71ba5	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	BATTERY	10	WARNING	Device battery is low	t	2026-01-13 13:41:59.967
10898008-8afe-4ce9-a4aa-6cf24175ebc9	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	250	WARNING	Elevated heart rate detected	t	2026-01-13 13:43:17.858
a948d79c-dd45-4d46-9b49-d7c26b3ee586	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	227	WARNING	Elevated heart rate detected	t	2026-01-13 13:43:40.563
72bd37ba-7c08-40ad-a485-34e1d830b158	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	215	WARNING	Elevated heart rate detected	t	2026-01-13 13:43:52.458
e674986b-5c2d-4e2e-83d9-26d716121d58	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	BATTERY	10	WARNING	Device battery is low	t	2026-01-13 13:43:40.565
85df4204-9e90-4919-a495-fedc7d2fe353	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	198	WARNING	Elevated heart rate detected	t	2026-01-13 13:44:44.724
5e3fba90-e68d-47a7-9938-b462840275eb	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	BATTERY	10	WARNING	Device battery is low	t	2026-01-13 13:44:44.727
a56df16b-e759-49ec-9b38-e6334b4f7de6	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	BATTERY	10	WARNING	Device battery is low	t	2026-01-14 04:22:28.733
b2c68c2e-fa64-4a5a-943d-d45b3dbeb8bd	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	205	WARNING	Elevated heart rate detected	t	2026-01-13 13:45:10.508
585a4c93-77f3-4bb7-85e5-5306f7795d6f	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	BATTERY	10	WARNING	Device battery is low	t	2026-01-14 04:45:09.065
50d49184-9a36-48d6-b4d7-7ec4bc7ade2f	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	233	WARNING	Elevated heart rate detected	t	2026-01-14 04:45:09.062
d844c1ea-4d3a-40c8-bff6-ef81822b8c45	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	BATTERY	10	WARNING	Device battery is low	t	2026-01-14 05:10:18.024
58a138fc-238b-4fa8-b7ad-be788d7c1cea	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	183	WARNING	Elevated heart rate detected	t	2026-01-17 05:34:21.654
ac2bc39a-4a78-403a-8468-b7904e614f65	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	214	WARNING	Elevated heart rate detected	t	2026-01-17 06:02:46.327
7ffcbbc0-c2c0-4b1a-943a-3ee92d8b4e27	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	230	WARNING	Elevated heart rate detected	t	2026-01-17 07:21:14.41
89c7637e-a2f2-4948-8ac3-0210e8f2e883	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	190	CRITICAL	Sustained high heart rate detected	f	2026-01-19 07:45:25.853
60de63a8-32ee-40d1-9b7e-947759a1b3ee	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	HEART_RATE	190	WARNING	Elevated heart rate detected	f	2026-01-19 07:45:57.102
1f539e1b-a8e4-4428-88c3-0a25700878cf	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	c08ada98-d190-4cd7-9a03-787e41a5a231	BATTERY	10	WARNING	Device battery is low	t	2026-01-17 05:34:21.67
\.


--
-- Data for Name: Device; Type: TABLE DATA; Schema: public; Owner: wintense
--

COPY public."Device" (id, name, type, "userId", "createdAt") FROM stdin;
4ab1e27b-aa94-4896-a517-8d0b2dd7c609	My Watch	MOCK_WATCH	1352fde5-9aa4-4c78-9356-946208a6000a	2025-12-17 09:56:20.428
46179afd-701d-4b8d-9862-64dedd855ef6	Test Watch	MOCK_WATCH	26ba4bbc-7de4-4516-9537-5f132fb7d51e	2025-12-17 10:42:34.075
23c092ee-e6ba-4f52-97ac-e7dd466a7db0	boat	MOCK_WATCH	a279d9b2-fec2-4db6-921c-155290ef75c9	2025-12-18 05:08:19.072
a4e21caa-a772-4d4b-b004-43f4f85d8119	boat	MOCK_WATCH	a83d735e-a071-4b26-8aac-dbab477c0292	2025-12-18 05:41:01.099
063bb4e3-2654-4a5d-a0db-8b8e35306d69	Test Watch	MOCK_WATCH	cd0c2813-5c42-48c2-84cb-59643aced6b9	2025-12-18 10:01:12.756
7d842d84-f2fa-4f7c-9be5-d5d55d7c48cc	wintensecare	MOCK_WATCH	24455c80-6f92-42e6-bfb2-b5850350ca93	2025-12-18 11:05:33.708
6d3bc7e0-e8fd-4afa-a5b0-7dfee698b872	wintensecare	MOCK_WATCH	24455c80-6f92-42e6-bfb2-b5850350ca93	2025-12-18 11:06:23.266
0bb4c438-46e4-4d61-8c51-eb37f14f6afb	My Watch	MOCK_WATCH	c8d2b9ca-0e52-4dcb-a8c0-48c72dbaf67e	2025-12-23 05:02:19.977
360b9804-f367-420b-8f4e-1f21daeca455	My Watch	MOCK_WATCH	c8d2b9ca-0e52-4dcb-a8c0-48c72dbaf67e	2025-12-23 05:02:21.668
d193e41c-96cc-4cfc-99fa-92d3d4123b57	My Watch	MOCK_WATCH	122d6ed6-96ba-4aee-b00f-692a91696c2e	2025-12-23 06:11:55.363
a704ed74-1a62-4147-a172-cea5ba60a845	My Watch	MOCK_WATCH	122d6ed6-96ba-4aee-b00f-692a91696c2e	2025-12-23 06:11:55.407
bd79f229-4c9f-453e-a8eb-1c21c9bd171f	ai	MOCK_WATCH	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	2025-12-30 06:17:23.021
b602ed12-f3ff-4b25-9838-ff81f4b8de50	WintenseCare Watch	WEARABLE DEVICE	ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	2025-12-22 07:31:49.711
c08ada98-d190-4cd7-9a03-787e41a5a231	Watch Wintensecare	Wintensecare_device	28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	2026-01-09 09:02:32.273
51a0708c-b06d-4b28-b7fa-3ce5a224946f	wintensecare	Wintensecare_device	dce6ac98-c0a0-42e2-be4b-9417864a8c66	2026-01-12 11:28:13.647
\.


--
-- Data for Name: ECG; Type: TABLE DATA; Schema: public; Owner: wintense
--

COPY public."ECG" (id, "deviceId", "createdAt", "durationMs", "samplingRate", signal, gain, lead, "paperSpeed", quality, unit) FROM stdin;
7fa7606e-ca8f-42db-8f4d-a712ccb1599e	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 06:23:30.118	1000	250	{0.12,0.15,0.18,0.1,-0.02,-0.15,-0.1,0.05,0.14,0.2}	10	I	25	50	mV
6b2a9be9-4d6b-4e72-a7a8-84cb7990b0c9	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 06:25:14.229	1000	250	{0.12,0.15,0.28,0.1,-0.02,-0.15,-0.1,0.05,0.14,0.2}	10	I	25	50	mV
3de77e3a-bd8c-4fe6-a728-aa00818f481d	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 06:25:25.888	1000	230	{0.12,0.15,0.28,0.1,-0.02,-0.15,-0.1,0.05,0.14,0.1}	10	I	25	50	mV
0b62fb47-e533-49ce-aa86-e45817f05e5d	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 07:06:56.42	5000	250	{0.12,0.15,0.18,0.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
26494ae5-b705-4c7e-9638-e4e225762ee9	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 07:07:13.087	5000	250	{0.12,0.15,0.18,0.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
c2aa6d98-7793-43cf-b55e-7998b402cbe3	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 07:07:22.775	5000	250	{0.12,0.15,0.18,0.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
554e4c54-727b-4101-8f37-4ff0a687ba1b	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 07:23:42.842	5000	250	{0.12,0.15,0.18,0.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
0460c3e5-325b-4449-944c-a03234930c7f	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 07:23:57.247	5000	230	{0.12,0.15,0.18,0.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
3ee1c320-2eef-433e-856d-b3260211a267	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 07:28:00.498	5000	230	{0.12,0.15,0.18,0.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
f001d1f2-a402-4e5e-83d1-19ff9816598f	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 07:29:05.105	5000	220	{0.12,0.12,0.18,0.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
97ece587-f1f7-494a-b65d-68d94b0473dd	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 07:45:52.789	5000	220	{0.12,0.15,0.18,0.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
933b27e0-e9ab-4d08-aa7b-bf4a3c9480cf	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 07:51:27.828	5000	220	{10,18,2.18,9.1,-0.02,-0.15,0.2,5.25,0.3,5.1,2.05}	10	I	25	50	mV
c5e5986e-9659-452b-b3a4-43c8a9736471	b602ed12-f3ff-4b25-9838-ff81f4b8de50	2026-01-08 12:35:20.567	3000	320	{4.12,6.15,7.18,8.1,-0.02,-0.15,9.2,6.25,87.3,44.1,0.05}	10	I	25	50	mV
18b1cfe9-088c-43f7-b081-7d0cdc7d247e	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-09 09:27:22.386	5000	250	{0.12,0.15,0.18,0.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
e7377985-5cf6-4ba4-83d1-4bbd7beb2b50	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-09 09:29:11.811	5000	230	{0.12,0.15,0.18,0.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
c4cc7545-f864-4ece-a07a-69d82ceb5bbe	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-09 09:29:15.673	3000	230	{0.12,0.15,0.18,0.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
77d8c595-3e9a-477d-9e3b-ed891ba89738	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-09 09:29:19.321	3000	230	{0.12,0.15,0.18,6.1,-0.02,-0.15,0.2,0.25,0.3,0.1,0.05}	10	I	25	50	mV
c98985c6-92a2-4ba7-900e-f73403187600	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-09 09:29:26.73	3000	230	{0.12,0.15,0.18,6.1,-0.02,-0.15,6.2,0.25,45.3,0.1,0.05}	10	I	25	50	mV
ff6db6e1-b164-4d5e-a9af-3f2dfef75627	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-09 09:29:30.437	3000	230	{90.12,0.15,0.18,6.1,-0.02,-0.15,6.2,0.25,45.3,0.1,0.05}	10	I	25	50	mV
b3fdba3d-f4ed-4ce4-bc79-171e590c60d0	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-12 05:30:02.122	4000	250	{0.12,0.15,0.18,0.2,0.22,0.25,0.3,0.95,-0.4,0.1}	10	I	25	50	mV
d57cb276-c66b-4791-93cb-10d6354d68ac	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-12 05:30:12.812	4000	250	{0.12,0.15,0.18,0.2,0.22,0.25,0.3,0.95,-0.4,0.1,0.14,0.16,0.18,0.2,0.22,0.24,0.28,0.92,-0.38,0.12,0.15,0.17,0.19,0.21,0.23,0.26,0.31,0.97,-0.42,0.11,0.14,0.16,0.18,0.2,0.22,0.25,0.29,0.93,-0.39,0.1,0.13,0.15,0.17,0.19,0.21,0.24,0.28,0.96,-0.41,0.12}	10	I	25	50	mV
c331528e-74b1-41b2-a7ef-9cae98eb4ae9	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-12 08:54:52.437	4000	250	{0.12,0.15,0.18,0.2,0.22,0.25,0.3,0.95,-0.4,0.1,0.14,0.16,0.18,0.2,0.22,0.24,0.28,0.92,-0.38,0.12,0.15,0.17,0.19,0.21,0.23,0.26,0.31,0.97,-0.42,0.11,0.14,0.16,0.18,0.2,0.22,0.25,0.29,0.93,-0.39,0.1,0.13,0.15,0.17,0.19,0.21,0.24,0.28,0.96,-0.41,0.12}	10	I	25	50	mV
53dd7d57-e827-402b-940b-2f2084661865	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-13 13:08:20.13	10000	250	{512,514,518,520,519,517,516,514,513,515,530,560,590,610,580,550,525,515,510,508,507,509,512,520,540,570,600,580,550,530,520,515,512,510,509,508,509,511,514,520}	10	I	25	50	mV
fc0d1569-02fd-4478-8706-4ffde700b76e	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-19 06:28:46.583	4000	250	{0.05,0.08,0.12,0.18,0.25,1.2,1.6,2.8,4.5,45.3,0.15,0.1,-0.05,-0.2,-1.8,-3.5,-10,0.05,0.1,0.15,1.4,1.8,2.3,0.9,0.2,0.1,0.05}	10	I	25	50	mV
912287f8-1a98-41ae-9ed2-423468a23021	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-19 06:29:02.877	4000	250	{0.05,0.08,0.12,0.18,0.25,1.2,1.6,2.8,4.5,45.3,0.15,0.1,-0.05,-0.2,-1.8,-3.5,-10,0.05,0.1,0.15,1.4,1.8,2.3,0.9,0.2,0.1,0.05}	10	I	25	50	mV
34e18b64-c6ea-42b4-a3b8-05737e7a0185	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-19 06:49:03.897	1000	250	{0.1,0.15,0.2,0.25,0.3,1.2,2,2,1.5,0.3,0.1,0.05,-0.1,-0.2,-0.1,0.05,0.1,0.15,0.2,0.25}	10	I	25	30	mV
389b6da0-4451-4bf6-bc60-bd501f74d0b8	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-19 06:50:34.531	1000	250	{0.1,0.15,0.2,0.25,0.3,1.2,2,2,1.5,0.3,0.1,0.05,-0.1,-0.2,-0.1,0.05,0.1,0.15,0.2,0.25}	10	I	25	30	mV
b8e6d3a9-19c6-4f7b-aacc-e1f5efe92206	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-19 06:50:39.417	1000	250	{0.1,0.15,0.2,0.25,0.3,1.2,2,2,1.5,0.3,0.1,0.05,-0.1,-0.2,-0.1,0.05,0.1,0.15,0.2,0.25}	10	I	25	30	mV
cd1aab23-173b-46c4-87bc-1b497a072c41	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-19 07:18:39.088	400	250	{0.02,0.05,0.1,0.25,0.6,1.1,0.7,0.3,0.1,0.05,0.02,0,-0.05,-0.15,-0.25,-0.2,-0.1,-0.05,0,0.02,0.02,0.05,0.1,0.25,0.6,1.1,0.7,0.3,0.1,0.05,0.02,0,-0.05,-0.15,-0.25,-0.2,-0.1,-0.05,0,0.02,0.02,0.05,0.1,0.25,0.6,1.1,0.7,0.3,0.1,0.05,0.02,0,-0.05,-0.15,-0.25,-0.2,-0.1,-0.05,0,0.02,0.02,0.05,0.1,0.25,0.6,1.1,0.7,0.3,0.1,0.05,0.02,0,-0.05,-0.15,-0.25,-0.2,-0.1,-0.05,0,0.02,0.02,0.05,0.1,0.25,0.6,1.1,0.7,0.3,0.1,0.05,0.02,0,-0.05,-0.15,-0.25,-0.2,-0.1,-0.05,0,0.02}	10	I	25	30	mV
ad645298-36c8-4cf5-8bcd-c1fb7fa5c389	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-19 07:20:14.185	2000	250	{0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0}	10	I	25	30	mV
904b92fb-383c-46c9-af18-cba35872defe	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-19 07:21:41.754	2000	250	{0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0}	10	I	25	60	mV
e4ea2984-f94f-4654-9269-5099c174f1fe	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-19 07:22:04.575	2000	250	{0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0}	10	I	25	60	mV
7fe61e7f-4e3a-449b-93c9-491fb6a88ccb	c08ada98-d190-4cd7-9a03-787e41a5a231	2026-01-19 07:32:19.283	6000	250	{0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0,0.02,0.04,0.06,0.08,0.1,0.12,0.15,0.2,0.35,0.6,1,0.8,0.4,0.2,0.1,0.05,0.02,0.01,0,-0.02,-0.05,-0.1,-0.2,-0.3,-0.25,-0.15,-0.08,-0.04,-0.02,0}	10	I	25	60	mV
\.


--
-- Data for Name: ECGSummary; Type: TABLE DATA; Schema: public; Owner: wintense
--

COPY public."ECGSummary" (id, "deviceId", "window", "avgHR", "minHR", "maxHR", "rrVar", "pvcCount", quality, "createdAt") FROM stdin;
d871523f-e8c2-4bc7-ab3f-49118027002f	b602ed12-f3ff-4b25-9838-ff81f4b8de50	1m	0	0	0	15	0	85	2026-01-08 07:23:42.862
1673e112-55bf-4cc3-afc6-8d516972bbf4	b602ed12-f3ff-4b25-9838-ff81f4b8de50	1m	0	0	0	15	0	85	2026-01-08 07:23:57.256
3b469215-c56c-41f8-bab9-4143a956c359	b602ed12-f3ff-4b25-9838-ff81f4b8de50	1m	0	0	0	15	0	85	2026-01-08 07:28:00.514
2338a90b-04d2-4159-bf1e-43882afb9914	b602ed12-f3ff-4b25-9838-ff81f4b8de50	1m	0	0	0	15	0	85	2026-01-08 07:29:05.134
eab7d080-d919-4a1a-8d4a-c017761ab4d9	b602ed12-f3ff-4b25-9838-ff81f4b8de50	1m	0	0	0	15	0	85	2026-01-08 07:45:52.805
091e0a14-9df5-493e-9281-29c2878e1649	b602ed12-f3ff-4b25-9838-ff81f4b8de50	1m	5	0	18	15	0	85	2026-01-08 07:51:27.856
a2ca16c6-1fd6-4299-b6c6-4687bdf4dee7	b602ed12-f3ff-4b25-9838-ff81f4b8de50	1m	16	0	87	15	0	85	2026-01-08 12:35:20.578
578d7622-cbe4-4bc7-b7eb-7628f694e577	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-09 09:27:22.393
5739e6e2-afa7-4c59-9214-59ebc06b9b87	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-09 09:29:11.832
2b241f2e-a4f2-4026-a21c-6c6abe73377a	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-09 09:29:15.679
d865c336-5337-4a00-8cae-83d4e91bf500	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-09 09:29:19.325
54472274-54a3-4a57-9449-a59c59b351b5	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-09 09:29:26.736
35ea2263-a7ac-4aaa-bc9d-a0de62afdd1f	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-09 09:29:30.443
47f5f0a4-1faa-45a8-9784-6e3926395f42	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-12 05:30:02.13
de2110d3-683a-4a04-91e2-1c63c8b8682b	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-12 05:30:12.819
07a6384f-654b-43d3-a834-07f57dd6c23a	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-12 08:54:52.454
38138806-34a1-45b4-bedd-fe7b604623d5	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-13 13:08:20.157
26de5e66-08fc-42ea-b732-7161dc1c7f34	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-19 06:28:46.624
5eb7c8af-ba5c-4f95-8ca0-adf07c0851fc	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	0	2026-01-19 06:29:02.893
57205a9b-c7c5-494e-befe-d7c044c6a1f9	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	30	2026-01-19 06:49:03.906
d872bfc6-2cce-46cd-98f5-9da32e03eb97	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	30	2026-01-19 06:50:34.548
e2344419-8ddf-4566-927e-691db187dd75	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	30	2026-01-19 06:50:39.422
ab45324c-eb0e-48ec-943a-289c2804366f	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	30	2026-01-19 07:18:39.103
7795d65e-3a09-447b-8fd0-8808b84493b1	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	0	0	0	0	0	30	2026-01-19 07:20:14.194
8208e282-36fb-4b13-b81a-6f2b76656646	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	167	167	167	0	0	60	2026-01-19 07:21:41.77
12e74a6c-fa4f-43cd-8cda-46d4efede4db	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	167	167	167	0	0	60	2026-01-19 07:22:04.582
c7378201-20ed-4d93-9a7e-1812cf26097f	c08ada98-d190-4cd7-9a03-787e41a5a231	1m	167	167	167	0	0	60	2026-01-19 07:32:19.3
\.


--
-- Data for Name: SpO2Sample; Type: TABLE DATA; Schema: public; Owner: wintense
--

COPY public."SpO2Sample" (id, "deviceId", value, perfusion, "createdAt") FROM stdin;
7a1f3623-8171-4716-bbda-db652edc9060	c08ada98-d190-4cd7-9a03-787e41a5a231	96	8	2026-01-13 07:50:34.616
bbaf018c-045e-4570-ba7d-1e047811667a	c08ada98-d190-4cd7-9a03-787e41a5a231	94	8	2026-01-13 07:54:20.088
eefae167-a7c9-461a-ae28-8340e6f6903f	c08ada98-d190-4cd7-9a03-787e41a5a231	94	8	2026-01-13 08:02:30.85
c1c1065c-fc2c-4b14-a3c2-edf554afc397	c08ada98-d190-4cd7-9a03-787e41a5a231	92	8	2026-01-13 08:02:36.317
d3a946f7-1067-440e-822a-a4d7bcb56710	c08ada98-d190-4cd7-9a03-787e41a5a231	92	5	2026-01-13 08:02:39.826
a935d7bd-09e3-47ef-afa0-8d6e81d3f049	c08ada98-d190-4cd7-9a03-787e41a5a231	90	7	2026-01-13 08:02:46.297
97d33a8e-95e5-4a08-809c-ab4c83d8636a	c08ada98-d190-4cd7-9a03-787e41a5a231	90	7	2026-01-13 08:19:11.908
f5153db3-41eb-43b7-8f22-608d30975033	c08ada98-d190-4cd7-9a03-787e41a5a231	90	\N	2026-01-13 13:18:46.47
bb3b459f-d99d-4db0-a3f7-a329fd02ce1d	c08ada98-d190-4cd7-9a03-787e41a5a231	90	\N	2026-01-13 13:18:53.552
6a73eeeb-f674-443a-a204-15762baaacff	c08ada98-d190-4cd7-9a03-787e41a5a231	97	60	2026-01-20 05:51:47.179
43d33110-d012-4c15-89a2-703b37644ce0	c08ada98-d190-4cd7-9a03-787e41a5a231	97	60	2026-01-20 05:52:01.066
3d4bc3a6-4e7a-4600-acec-e55d44cd2bbf	c08ada98-d190-4cd7-9a03-787e41a5a231	96	60	2026-01-20 05:52:05.755
314bb65c-82dd-4824-a931-85cae14536e1	c08ada98-d190-4cd7-9a03-787e41a5a231	93	60	2026-01-20 05:52:09.732
2ac87d71-71d2-46cf-a9a3-764300b58772	c08ada98-d190-4cd7-9a03-787e41a5a231	93	59	2026-01-20 05:52:13.176
50055141-b8c1-4fb3-be41-45776bdef113	c08ada98-d190-4cd7-9a03-787e41a5a231	92	59	2026-01-20 05:52:18.672
c9f92506-3553-4356-8381-bc8a8748dc81	c08ada98-d190-4cd7-9a03-787e41a5a231	92	58	2026-01-20 05:52:21.86
8441b7e9-f004-47b1-8e4a-7af53afcde60	c08ada98-d190-4cd7-9a03-787e41a5a231	91	58	2026-01-20 05:52:25.719
0de2db92-e42f-4546-8e7b-323f53f83dfc	c08ada98-d190-4cd7-9a03-787e41a5a231	98	58	2026-01-20 05:52:31.206
74db5470-79f6-4af6-a7b2-96d4c933dc0f	c08ada98-d190-4cd7-9a03-787e41a5a231	99	58	2026-01-20 05:52:35.488
ab615d78-8a44-4e27-bd71-2573980ef016	c08ada98-d190-4cd7-9a03-787e41a5a231	90	57	2026-01-20 05:52:42.282
fc1834b1-71ac-42f8-a882-94218b494c1d	c08ada98-d190-4cd7-9a03-787e41a5a231	89	57	2026-01-20 05:52:46.574
11108d38-137f-4141-98c0-78bacf254d84	c08ada98-d190-4cd7-9a03-787e41a5a231	89	57	2026-01-20 06:00:51.436
e7db4a94-0a71-431d-9afe-711b13429277	c08ada98-d190-4cd7-9a03-787e41a5a231	89	57	2026-01-20 06:30:15.075
1fe3a62e-bc21-45f3-bcf4-1999e7dd4d1a	c08ada98-d190-4cd7-9a03-787e41a5a231	90	57	2026-01-20 06:30:26.545
3dd0320f-62a0-4ca6-b9e8-66955fcd8952	c08ada98-d190-4cd7-9a03-787e41a5a231	91	57	2026-01-20 06:30:30.813
0681b9f7-8fbb-4389-97d4-9e362426896d	c08ada98-d190-4cd7-9a03-787e41a5a231	93	57	2026-01-20 06:30:34.725
64b58a99-5401-4024-8e62-6eb4dd7d6432	c08ada98-d190-4cd7-9a03-787e41a5a231	98	57	2026-01-20 06:30:38.679
638ae03b-e9ee-47ad-9ab4-f1e1296a6bd0	c08ada98-d190-4cd7-9a03-787e41a5a231	99	57	2026-01-20 06:30:44.318
dd6d7275-2d92-45e9-91df-72b941a5c027	c08ada98-d190-4cd7-9a03-787e41a5a231	97	57	2026-01-20 06:30:47.928
3dc1f305-417b-4a93-bb84-86643bc4f771	c08ada98-d190-4cd7-9a03-787e41a5a231	87	57	2026-01-20 06:30:53.24
61019578-e0ae-4116-801b-e2dec192eaf8	c08ada98-d190-4cd7-9a03-787e41a5a231	85	57	2026-01-20 06:30:58.484
72acf192-8fb8-409c-b3b0-8d6bdb769cd4	c08ada98-d190-4cd7-9a03-787e41a5a231	85	70	2026-01-20 06:31:02.915
607ed8eb-4c39-4005-927b-2c749c63c2c8	c08ada98-d190-4cd7-9a03-787e41a5a231	95	70	2026-01-20 06:31:07.694
64fb271b-6787-4f20-bbce-636a7c9a1562	c08ada98-d190-4cd7-9a03-787e41a5a231	95	70	2026-01-20 06:33:10.91
8a987fd9-0cb2-4982-91b3-51e0d24458ca	c08ada98-d190-4cd7-9a03-787e41a5a231	93	70	2026-01-20 06:33:18.538
ec6201d8-b375-4dce-8b5b-bcc472ca610a	c08ada98-d190-4cd7-9a03-787e41a5a231	99	70	2026-01-20 06:33:22.9
b386d2b6-4d98-4142-9e4a-87e628ef6b6d	c08ada98-d190-4cd7-9a03-787e41a5a231	100	70	2026-01-20 06:33:28.172
8b791f27-b327-4f55-b4fb-f3117f3523c0	c08ada98-d190-4cd7-9a03-787e41a5a231	100	70	2026-01-20 07:52:58.699
e2b4d57f-569c-48fd-9bc4-7fb630fb3d67	c08ada98-d190-4cd7-9a03-787e41a5a231	99	70	2026-01-20 07:53:04.947
3616b42b-c602-4886-894c-e6a0188c2ce2	c08ada98-d190-4cd7-9a03-787e41a5a231	98	70	2026-01-20 07:53:09.84
2513ec3d-7ccb-47f2-9f5a-0bb2dd8af740	c08ada98-d190-4cd7-9a03-787e41a5a231	97	70	2026-01-20 07:53:14.186
af23a99d-fe5e-4ecf-bc71-2fc30946414b	c08ada98-d190-4cd7-9a03-787e41a5a231	96	70	2026-01-20 07:53:18.95
e619403c-7740-473b-b68b-668bdab86a8b	c08ada98-d190-4cd7-9a03-787e41a5a231	96	70	2026-01-20 07:53:23.081
a5018a40-db65-437f-81c4-198d04f12816	c08ada98-d190-4cd7-9a03-787e41a5a231	95	70	2026-01-20 07:53:27.641
08bbcdef-ebe8-4d2c-83f0-8303fd40ac1e	c08ada98-d190-4cd7-9a03-787e41a5a231	94	70	2026-01-20 07:53:31.374
76f4bbe0-d4f2-4375-82d8-7bbbdf14ae27	c08ada98-d190-4cd7-9a03-787e41a5a231	93	70	2026-01-20 07:53:34.634
7950de8c-363d-4e99-8f7e-5ba59574d339	c08ada98-d190-4cd7-9a03-787e41a5a231	92	70	2026-01-20 07:53:38.309
8ad96808-06ce-4b94-9c7c-2ccce93b91b4	c08ada98-d190-4cd7-9a03-787e41a5a231	91	70	2026-01-20 07:53:41.912
e9890bfc-5ed1-4196-b99f-cb13fbe56f51	c08ada98-d190-4cd7-9a03-787e41a5a231	93	70	2026-01-20 08:17:32.512
7ad1747b-2d65-4452-b100-302e66f5e9c1	c08ada98-d190-4cd7-9a03-787e41a5a231	93	70	2026-01-20 08:17:35.047
be18ea14-5128-47e0-afd8-956a9ef9f8f5	c08ada98-d190-4cd7-9a03-787e41a5a231	93	70	2026-01-20 08:22:41.57
4a4a38f2-2350-46f2-873b-03922b972e28	c08ada98-d190-4cd7-9a03-787e41a5a231	94	70	2026-01-20 08:22:48.693
4d548162-30f0-4bbd-a0bf-0e6c1e8f08c6	c08ada98-d190-4cd7-9a03-787e41a5a231	96	70	2026-01-20 08:22:52.44
8029d2e1-f0e9-46ef-966d-1f3d4d3b1e6b	c08ada98-d190-4cd7-9a03-787e41a5a231	96	70	2026-01-20 08:25:29.729
32178ca5-5833-4c7c-a50c-4ae89013390f	c08ada98-d190-4cd7-9a03-787e41a5a231	98	70	2026-01-20 08:25:34.871
2986d6b5-e85e-4e26-9632-0625e18c0c9b	c08ada98-d190-4cd7-9a03-787e41a5a231	95	70	2026-01-20 08:25:39.328
1423b383-4d6e-474f-a5b6-cf7adace39bf	c08ada98-d190-4cd7-9a03-787e41a5a231	92	70	2026-01-20 08:25:42.617
34b06ec4-e02e-4b9d-baff-3925327393bb	c08ada98-d190-4cd7-9a03-787e41a5a231	92	70	2026-01-20 08:44:35.913
c75c1ec4-2f68-4d2e-974b-81828d6f4373	c08ada98-d190-4cd7-9a03-787e41a5a231	91	70	2026-01-20 08:44:41.043
4f788dc1-2776-4579-9a03-9857f55ad3a5	c08ada98-d190-4cd7-9a03-787e41a5a231	90	70	2026-01-20 08:44:45.52
4b117253-8eb5-48fa-8f1d-a09ffb631fec	c08ada98-d190-4cd7-9a03-787e41a5a231	90	70	2026-01-20 08:45:33.424
6fc0ddc1-3d32-404b-9722-bae8ed5579ed	c08ada98-d190-4cd7-9a03-787e41a5a231	90	70	2026-01-20 08:45:34.693
00e8aaaf-cb5f-43c9-96f4-fb3229e463f4	c08ada98-d190-4cd7-9a03-787e41a5a231	96	70	2026-01-20 08:45:43.715
4f4d50ab-229e-4520-81ea-8c19d726b946	c08ada98-d190-4cd7-9a03-787e41a5a231	95	70	2026-01-20 08:45:49.774
eab6817b-8112-40cd-9167-555b18eda5e5	c08ada98-d190-4cd7-9a03-787e41a5a231	95	70	2026-01-20 10:41:29.519
230c4229-4247-49b4-9203-69f4e0a1c487	c08ada98-d190-4cd7-9a03-787e41a5a231	85	70	2026-01-20 10:41:36.06
34575b8c-16a3-424f-bb30-a40d4a5c64ec	c08ada98-d190-4cd7-9a03-787e41a5a231	95	70	2026-01-20 10:41:56.95
0bafa430-67c0-4bea-923e-3408ab496bfe	c08ada98-d190-4cd7-9a03-787e41a5a231	99	70	2026-01-20 10:42:23.671
061aadc2-6ec1-4c37-8ffc-529a3e2ed77d	c08ada98-d190-4cd7-9a03-787e41a5a231	99	70	2026-01-20 10:43:08.7
291a2873-f42a-46b3-a64e-594482a05f19	c08ada98-d190-4cd7-9a03-787e41a5a231	99	90	2026-01-20 10:43:12.313
977f3b3b-8449-4ff8-a073-444a5bfdcca3	c08ada98-d190-4cd7-9a03-787e41a5a231	99	90	2026-01-20 10:43:38.787
7841b458-c77f-450b-9241-2823df953c7f	c08ada98-d190-4cd7-9a03-787e41a5a231	100	90	2026-01-20 10:46:42.123
5cf0fb4c-0722-4461-94be-9d3417b5bd4b	c08ada98-d190-4cd7-9a03-787e41a5a231	70	90	2026-01-20 10:47:26.078
\.


--
-- Data for Name: Telemetry; Type: TABLE DATA; Schema: public; Owner: wintense
--

COPY public."Telemetry" (id, "deviceId", "heartRate", steps, battery, "createdAt") FROM stdin;
d96c9664-c847-41a6-b3f4-0ba2029a805b	a4e21caa-a772-4d4b-b004-43f4f85d8119	78	150	90	2025-12-18 05:42:07.24
386134f5-4381-41da-ba41-468e132a3421	a4e21caa-a772-4d4b-b004-43f4f85d8119	72	150	90	2025-12-18 05:42:41.957
627d2b67-ffc2-4434-bfb4-e0b658a36efe	a4e21caa-a772-4d4b-b004-43f4f85d8119	72	50	60	2025-12-18 05:45:35.018
11f4f5b1-c874-456b-9fb4-6c421785e5cc	a4e21caa-a772-4d4b-b004-43f4f85d8119	82	770	50	2025-12-18 05:45:47.336
b173a8dc-c8ce-4b2e-af83-c4117630a8b0	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	190	5	50	2025-12-18 08:03:41.893
05f72be9-de8e-4734-b5e5-0a40cb718a9f	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	2000	5	40	2025-12-18 08:03:57.11
c81afce7-00a2-4374-a317-7b7f8c9725c6	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	200	50	4	2025-12-18 08:04:12.707
8f174681-e4eb-4262-8c8e-95961959f0ac	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	190	220	40	2025-12-18 08:05:50.516
930b9c50-b543-40fc-a0bd-d1963d2ccf67	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	190	220	40	2025-12-18 08:06:57.631
2707f687-a388-4540-8126-a0640f4e81b3	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	200	220	40	2025-12-18 08:07:10.081
bbd1167f-d36c-413e-98d7-f159267357a0	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	200	20	40	2025-12-18 08:07:55.75
163b25c7-d705-4586-a907-059d5f9a0a11	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	200	7	40	2025-12-18 08:08:48.114
2d244fdc-b632-49d8-8af8-10cc7b20d1c9	23c092ee-e6ba-4f52-97ac-e7dd466a7db0	200	7	40	2025-12-18 08:09:23.783
4178c43b-68b9-4a40-a7e5-305e2d5cd122	063bb4e3-2654-4a5d-a0db-8b8e35306d69	190	5	50	2025-12-18 10:02:41.426
9671f638-b024-4731-aa54-5c5ad3cb85c6	063bb4e3-2654-4a5d-a0db-8b8e35306d69	190	5	8	2025-12-18 10:03:17.783
6132b19b-9635-4b64-8d41-fff51967573b	063bb4e3-2654-4a5d-a0db-8b8e35306d69	190	23	50	2025-12-18 10:03:34.733
74b36730-5c7e-4ad5-ab3f-45ee71a7b40d	063bb4e3-2654-4a5d-a0db-8b8e35306d69	290	23	50	2025-12-18 10:04:16.62
da50f439-fffa-4817-b518-3098c501d757	063bb4e3-2654-4a5d-a0db-8b8e35306d69	290	5	50	2025-12-18 10:15:22.953
eb9101f5-dbc8-4773-abd5-990cfc9fe907	063bb4e3-2654-4a5d-a0db-8b8e35306d69	290	5	50	2025-12-18 10:25:23.959
1133db7e-3937-482c-8084-68fe941acb14	063bb4e3-2654-4a5d-a0db-8b8e35306d69	290	5	50	2025-12-18 10:25:27.657
b5cbad88-deca-48cf-8d2f-b6f365c85f06	063bb4e3-2654-4a5d-a0db-8b8e35306d69	200	5	50	2025-12-18 10:25:32.945
3a306953-817d-46c1-a817-3a06b0616281	7d842d84-f2fa-4f7c-9be5-d5d55d7c48cc	140	5	50	2025-12-18 11:09:00.671
9f35ca67-b1b0-489a-9c47-e4e0a5c5e5ff	7d842d84-f2fa-4f7c-9be5-d5d55d7c48cc	110	50	50	2025-12-18 11:09:17.037
9079b8d7-6509-41d6-bc1c-4afa80ff0afc	7d842d84-f2fa-4f7c-9be5-d5d55d7c48cc	170	70	49	2025-12-18 11:09:29.473
c8b8fbb2-cfc6-4fc6-bac0-3a11d4d7c791	7d842d84-f2fa-4f7c-9be5-d5d55d7c48cc	170	70	49	2025-12-18 11:13:40.631
b8640a2a-7a39-41ce-83fd-5cc0698bd15f	7d842d84-f2fa-4f7c-9be5-d5d55d7c48cc	190	70	49	2025-12-18 11:17:49.013
5e5ceb76-ab13-43c9-a4cf-b80b922be0da	7d842d84-f2fa-4f7c-9be5-d5d55d7c48cc	190	70	49	2025-12-18 11:17:58.375
68a980ce-19cc-4e05-98ef-a62603fa6d9e	b602ed12-f3ff-4b25-9838-ff81f4b8de50	180	12	60	2025-12-22 07:34:57.426
5aad27d1-8b7d-496b-9211-b5d8410717cf	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	19	60	2025-12-22 07:35:14.651
2d6ff2fe-de89-412b-86f8-41bb5bd4a9be	b602ed12-f3ff-4b25-9838-ff81f4b8de50	200	24	59	2025-12-22 07:35:25.17
9a049b4f-5cef-4833-b3f0-089aeab0eb52	b602ed12-f3ff-4b25-9838-ff81f4b8de50	80	40	58	2025-12-22 07:35:40.668
6d6b3c28-dbdd-467e-ae95-d6fd50708555	b602ed12-f3ff-4b25-9838-ff81f4b8de50	230	300	39	2025-12-23 06:29:11.097
64522801-1bcb-42cb-ad46-e1e16411d6d8	b602ed12-f3ff-4b25-9838-ff81f4b8de50	230	400	29	2025-12-23 06:31:37.972
19fad030-c173-4379-be57-3c6795629476	b602ed12-f3ff-4b25-9838-ff81f4b8de50	80	600	38	2025-12-23 07:49:01.067
c5c8a0f1-f308-4106-a214-6ce4d4b0a019	b602ed12-f3ff-4b25-9838-ff81f4b8de50	90	600	38	2025-12-23 07:49:30.347
e64aa307-5336-448f-8a77-8d5255db79c0	b602ed12-f3ff-4b25-9838-ff81f4b8de50	90	600	38	2025-12-23 07:49:41.958
208b0aef-3c9f-46f5-a5e5-87b7df0cdc87	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	5	50	2025-12-24 04:40:14.833
b8693f61-0742-4ecc-975c-6a87b9bd52a4	b602ed12-f3ff-4b25-9838-ff81f4b8de50	160	56	50	2025-12-24 04:40:24.277
1f9d8989-7430-4c17-90df-b7a18b00af96	b602ed12-f3ff-4b25-9838-ff81f4b8de50	290	5	50	2025-12-24 04:42:43.613
76bf470d-5947-4906-a423-6c5562348a63	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	5	50	2025-12-24 05:57:42.94
72af47fb-1c0d-42c6-ae68-12446a981c86	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	5	50	2025-12-24 07:23:03.659
777b3b4d-7d66-4f79-9319-8d9a4e2c0b59	b602ed12-f3ff-4b25-9838-ff81f4b8de50	140	30	45	2025-12-24 07:23:15.975
a64d7f29-4882-406c-9afb-c1963b227a59	b602ed12-f3ff-4b25-9838-ff81f4b8de50	140	40	45	2025-12-24 07:23:26.352
76e259e1-b184-4fc4-8c57-d52dc561bcec	b602ed12-f3ff-4b25-9838-ff81f4b8de50	240	40	45	2025-12-24 07:25:15.304
4ba25bca-46eb-4917-a1bf-d26e576416f0	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	5	50	2025-12-24 09:58:22.616
9da4b62d-c926-48f5-9fce-9ae477f3876c	b602ed12-f3ff-4b25-9838-ff81f4b8de50	175	44	50	2025-12-24 10:15:27.985
92aa60ab-9a1c-4d2b-9a74-6a6d837263d2	b602ed12-f3ff-4b25-9838-ff81f4b8de50	175	44	50	2025-12-24 10:38:12.486
b7e71637-6c85-4860-8029-cc277575ceca	b602ed12-f3ff-4b25-9838-ff81f4b8de50	140	50	50	2025-12-26 05:23:34.781
57e21cef-9a0d-47af-99e3-d772b2a85d6b	b602ed12-f3ff-4b25-9838-ff81f4b8de50	170	60	50	2025-12-26 05:24:10.676
1fb035cc-1175-473b-b91d-97aab50b6057	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	90	50	2025-12-26 05:24:22.46
c9c66e40-9a1b-4c11-8cbc-b98985461fdf	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	5	50	2025-12-26 07:06:03.937
499d2a21-675c-42c7-91a4-6724fc726beb	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	5	5	2025-12-29 10:32:43.883
bdbde20a-de69-4b72-b27a-b250f187eac6	b602ed12-f3ff-4b25-9838-ff81f4b8de50	170	50	44	2025-12-29 10:32:54.154
9515e773-9621-479d-89f1-16531ad45a44	b602ed12-f3ff-4b25-9838-ff81f4b8de50	270	90	44	2025-12-29 10:33:04.682
3299d0a9-94bc-4d1b-8525-49247f0c59d2	b602ed12-f3ff-4b25-9838-ff81f4b8de50	180	10	50	2025-12-30 07:09:28.82
5cc6e63d-3623-4157-a635-1fd51296f0ed	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	5	50	2026-01-05 10:37:23.897
0895129b-bc6b-4c7d-9a52-a6db893a3781	b602ed12-f3ff-4b25-9838-ff81f4b8de50	120	5	50	2026-01-05 10:38:04.348
d85ddcd2-aadf-49b6-b196-9bd4fe9bfb30	b602ed12-f3ff-4b25-9838-ff81f4b8de50	100	5	50	2026-01-05 10:38:09.262
564bde8a-cde4-43ea-9e75-1211c0147952	b602ed12-f3ff-4b25-9838-ff81f4b8de50	170	5	50	2026-01-05 10:38:14.283
a29f4f28-8d1c-411e-9f3a-d78fff24c90e	b602ed12-f3ff-4b25-9838-ff81f4b8de50	170	5	50	2026-01-05 11:03:46.133
36b4506c-dab1-4e63-a517-1a77de306a2f	b602ed12-f3ff-4b25-9838-ff81f4b8de50	170	5	50	2026-01-05 11:03:48.143
ecb98409-39eb-4f76-9b3f-8a836ef0414a	4ab1e27b-aa94-4896-a517-8d0b2dd7c609	170	5	50	2026-01-06 07:09:09.785
5300944f-7e38-4266-ac55-009e201d6c74	4ab1e27b-aa94-4896-a517-8d0b2dd7c609	190	50	20	2026-01-06 07:09:31.397
c3fbc908-afe1-47d1-98d8-0c9dd5c7582e	4ab1e27b-aa94-4896-a517-8d0b2dd7c609	190	50	20	2026-01-06 07:12:31.617
837e8c60-7ab3-4494-8315-9a4215739db3	4ab1e27b-aa94-4896-a517-8d0b2dd7c609	190	50	20	2026-01-06 07:14:17.578
ac21324a-9276-4929-a726-adef2cfedd80	4ab1e27b-aa94-4896-a517-8d0b2dd7c609	200	50	20	2026-01-06 07:14:24.815
31e5d30e-bdc2-43df-91da-e5f9b8ea3a1b	4ab1e27b-aa94-4896-a517-8d0b2dd7c609	200	50	20	2026-01-06 07:15:16.003
cfa32257-05ca-4892-889e-c87a58ab6426	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	5	50	2026-01-06 07:21:04.235
46811040-4160-4333-9647-dfaee55ee11c	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	5	20	2026-01-06 07:21:34.911
0da03e5d-e901-4b24-b5e6-1e84e0b83106	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	50	20	2026-01-06 07:53:03.918
c139c285-f695-4ab5-b5da-095df8f3eb29	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	50	5	2026-01-06 08:01:50.993
f22e5a9d-41ec-4769-8ddd-44a7a22150b7	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	50	5	2026-01-06 08:18:34.37
753e2e14-0d94-4f5e-b9d9-001a336eed7a	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	50	5	2026-01-06 10:34:19.157
9487cfa6-00c3-4c94-972b-2f7dcbc7bdf5	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	50	5	2026-01-06 10:39:03.322
54e299e3-60db-4320-a6c3-47d1a0a79b21	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	50	5	2026-01-06 11:47:51.635
ce4e0b07-503e-4259-b316-b75d133e0371	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	50	5	2026-01-06 11:50:15.852
93e72928-9dee-44f4-96ab-4f8fd57ff405	b602ed12-f3ff-4b25-9838-ff81f4b8de50	290	50	5	2026-01-06 11:50:27.482
1625bebe-854a-429c-a89d-8b38a9e846db	b602ed12-f3ff-4b25-9838-ff81f4b8de50	190	50	5	2026-01-09 08:56:01.204
21106f4b-1f72-4551-aa2f-8cf732b01cbf	b602ed12-f3ff-4b25-9838-ff81f4b8de50	200	90	5	2026-01-09 08:56:18.449
d9a07e73-11db-4d6e-9703-a8b571968774	c08ada98-d190-4cd7-9a03-787e41a5a231	190	5	50	2026-01-09 09:04:29.849
137a1038-5cab-4454-9264-fc58218161ab	c08ada98-d190-4cd7-9a03-787e41a5a231	200	5	50	2026-01-09 09:04:34.108
6379a5c7-10b6-4011-a374-72c1a38ecb36	c08ada98-d190-4cd7-9a03-787e41a5a231	200	50	50	2026-01-09 09:04:38.09
96e9d796-2f57-4cd7-9abb-d976bae85497	c08ada98-d190-4cd7-9a03-787e41a5a231	200	50	70	2026-01-09 09:04:42.22
3550c936-9010-4508-b26e-e5d1bf0fdf2f	c08ada98-d190-4cd7-9a03-787e41a5a231	90	50	70	2026-01-09 09:04:53.751
fd1b9639-836c-48f6-9802-b35ddb1c085f	c08ada98-d190-4cd7-9a03-787e41a5a231	80	50	70	2026-01-09 09:04:59.477
c7201d6c-0751-4382-beaa-78c78eb5449d	c08ada98-d190-4cd7-9a03-787e41a5a231	80	50	30	2026-01-09 09:05:05.012
eb8014b0-26e3-4e86-a664-b31f3e238a95	c08ada98-d190-4cd7-9a03-787e41a5a231	20	50	30	2026-01-09 09:07:08.287
101883af-ca25-4f93-88fa-727b536f9d19	c08ada98-d190-4cd7-9a03-787e41a5a231	70	50	30	2026-01-09 09:07:17.939
0f924a48-5150-41d6-b770-f1473db683f8	c08ada98-d190-4cd7-9a03-787e41a5a231	70	50	80	2026-01-09 09:07:21.85
173666f9-fc1d-4f43-ac94-3515d8b02962	c08ada98-d190-4cd7-9a03-787e41a5a231	230	50	80	2026-01-09 09:08:41.639
7cd46bf1-c6b3-48d8-b2c1-f65c43594255	c08ada98-d190-4cd7-9a03-787e41a5a231	290	50	5	2026-01-10 06:26:05.612
f5fd58db-1a55-4afc-9f83-591295c4fd3e	c08ada98-d190-4cd7-9a03-787e41a5a231	200	50	5	2026-01-10 07:13:44.101
ac76bbc5-92ee-4ba4-b4c8-8e7eecc935a8	c08ada98-d190-4cd7-9a03-787e41a5a231	200	50	5	2026-01-10 07:21:07.176
7ac835ba-e275-47d8-bbdb-6f59e22ca595	c08ada98-d190-4cd7-9a03-787e41a5a231	200	60	5	2026-01-10 07:22:52.816
cd57cc9a-e4dd-44a3-a69b-9261f964f6d4	c08ada98-d190-4cd7-9a03-787e41a5a231	250	60	5	2026-01-10 07:23:19.3
56313a60-1650-44ee-87b4-c5e1f5596860	c08ada98-d190-4cd7-9a03-787e41a5a231	250	40	5	2026-01-10 07:23:26.935
e1cf4ec2-b23a-431d-9403-2083fbd8e5a0	c08ada98-d190-4cd7-9a03-787e41a5a231	230	10	5	2026-01-10 07:23:51.679
3ae6ed7f-8aea-4f73-90d8-5e3583cb0e21	c08ada98-d190-4cd7-9a03-787e41a5a231	230	10	5	2026-01-10 07:23:55.207
ec7d976d-7a58-42ae-9492-3223a8e4b029	c08ada98-d190-4cd7-9a03-787e41a5a231	260	10	5	2026-01-10 07:24:16.444
df40b9c4-d337-4ae9-bba0-1b6cbfe40a83	c08ada98-d190-4cd7-9a03-787e41a5a231	210	10	5	2026-01-10 07:25:42.281
6a4ab05e-cca6-4001-bd62-fa4c7984cfe4	c08ada98-d190-4cd7-9a03-787e41a5a231	290	10	5	2026-01-10 07:25:57.761
984f269c-0005-4894-9174-08c60b1d91e9	c08ada98-d190-4cd7-9a03-787e41a5a231	290	10	3	2026-01-10 07:26:06.8
20ed5e9f-a5e6-4b11-8928-d544f8684548	c08ada98-d190-4cd7-9a03-787e41a5a231	290	10	3	2026-01-10 07:26:30.995
9e65971a-c33f-4674-b971-d02b2e366cab	c08ada98-d190-4cd7-9a03-787e41a5a231	220	10	3	2026-01-10 07:27:15.419
222dcb4f-5732-44e2-b881-3c419954d471	c08ada98-d190-4cd7-9a03-787e41a5a231	220	10	3	2026-01-10 07:27:36.562
7d608ac0-9148-4254-a0f8-e556af949006	c08ada98-d190-4cd7-9a03-787e41a5a231	240	10	3	2026-01-10 07:27:41.682
22338e30-ab03-4e71-83f7-9d6c7e7a76f0	c08ada98-d190-4cd7-9a03-787e41a5a231	240	10	3	2026-01-10 07:27:53.31
59ccac40-3f9b-4f6e-a6cd-899e05d795b9	c08ada98-d190-4cd7-9a03-787e41a5a231	171	10	3	2026-01-10 07:31:19.228
ff30d09b-3403-4bdb-829d-1a2ad39e17d3	c08ada98-d190-4cd7-9a03-787e41a5a231	171	10	3	2026-01-10 07:31:54.733
23a562fe-400c-4f46-a0cb-59ec44e479be	c08ada98-d190-4cd7-9a03-787e41a5a231	201	10	3	2026-01-10 07:32:26.004
ff97f227-4fdb-4a33-8e43-50aef0fc0b44	c08ada98-d190-4cd7-9a03-787e41a5a231	201	10	30	2026-01-10 07:33:02.099
1da71305-3a62-4fe9-af90-f380c6f743f2	c08ada98-d190-4cd7-9a03-787e41a5a231	175	10	30	2026-01-10 07:34:16.295
f9ca7b5b-60f4-4e4e-8292-89a0037ab279	c08ada98-d190-4cd7-9a03-787e41a5a231	205	50	30	2026-01-10 07:45:29.242
13250433-566d-434e-a753-a9f8c0148888	c08ada98-d190-4cd7-9a03-787e41a5a231	195	50	30	2026-01-10 07:46:03.967
6d5096ca-e450-4dc7-9f49-611e5d2cf907	c08ada98-d190-4cd7-9a03-787e41a5a231	195	50	30	2026-01-10 07:47:54.812
fac48eb1-a6d7-48c9-8184-8e4309195708	c08ada98-d190-4cd7-9a03-787e41a5a231	205	50	30	2026-01-10 07:48:11.906
1b145c79-59f1-4d5f-b02d-2368245a94a1	c08ada98-d190-4cd7-9a03-787e41a5a231	205	50	30	2026-01-10 07:54:16.771
f8e467d4-976e-4e92-a440-24b58b12e242	c08ada98-d190-4cd7-9a03-787e41a5a231	205	50	30	2026-01-10 07:54:44.68
3ac47710-ae50-49a9-9ca4-6066e5ff162a	c08ada98-d190-4cd7-9a03-787e41a5a231	205	50	0	2026-01-10 07:54:54.777
63b434b7-78fd-40f9-b2ac-c806fd953e34	c08ada98-d190-4cd7-9a03-787e41a5a231	205	30	0	2026-01-10 07:58:50.377
6229756e-ff4c-49c7-b8aa-e837b938daea	c08ada98-d190-4cd7-9a03-787e41a5a231	105	30	0	2026-01-10 08:29:16.571
a07ee9dc-405d-4164-b39e-6dcb1e3cb2bb	c08ada98-d190-4cd7-9a03-787e41a5a231	135	30	40	2026-01-10 08:30:25.465
57821b29-95bf-4e8c-9d1b-1d2f0a010940	c08ada98-d190-4cd7-9a03-787e41a5a231	135	30	40	2026-01-10 08:30:43.261
473b51c7-6832-4f82-927c-157eebec25ec	c08ada98-d190-4cd7-9a03-787e41a5a231	190	50	5	2026-01-12 05:17:32.274
591fa723-b23a-4c94-a5b1-566b0e4270c5	c08ada98-d190-4cd7-9a03-787e41a5a231	120	50	50	2026-01-12 05:17:42.994
1a4f9f64-281b-4c14-bc6e-bc87e99897b7	c08ada98-d190-4cd7-9a03-787e41a5a231	80	50	50	2026-01-12 05:17:52.839
cd49a6bb-1363-41af-b550-acf68665ed8d	c08ada98-d190-4cd7-9a03-787e41a5a231	80	50	50	2026-01-12 10:50:17.083
0ce4310e-7958-4954-b05b-eff8731c8a45	c08ada98-d190-4cd7-9a03-787e41a5a231	200	50	50	2026-01-12 10:50:23.296
35475af0-05e5-4555-acde-c72fadf93fb5	c08ada98-d190-4cd7-9a03-787e41a5a231	200	50	50	2026-01-12 10:50:43.839
25f7bf69-c2a6-451f-b33f-c1aa8b275a64	c08ada98-d190-4cd7-9a03-787e41a5a231	180	50	50	2026-01-12 10:50:59.98
4befc0d0-d899-4180-b60e-cd8b4dd920fc	c08ada98-d190-4cd7-9a03-787e41a5a231	180	50	50	2026-01-12 10:51:22.645
6e17588e-0891-40a6-8458-480dd5b59632	c08ada98-d190-4cd7-9a03-787e41a5a231	180	50	50	2026-01-12 10:51:34.416
2a4afe6b-0b33-49f9-af24-28ce37ea6525	c08ada98-d190-4cd7-9a03-787e41a5a231	180	50	5	2026-01-12 10:52:09.727
43d26df2-ac1e-41a8-b0ce-7c41682245b4	c08ada98-d190-4cd7-9a03-787e41a5a231	190	5	50	2026-01-13 05:57:31.074
61867f35-8ee8-4042-8849-12687c67d0f5	c08ada98-d190-4cd7-9a03-787e41a5a231	190	10	50	2026-01-13 06:01:23.64
0c623e4b-239f-453d-ba03-304318502eef	c08ada98-d190-4cd7-9a03-787e41a5a231	190	20	50	2026-01-13 06:01:47.921
ea15e86a-ba0d-428d-80d1-56717072ffe8	c08ada98-d190-4cd7-9a03-787e41a5a231	190	5	50	2026-01-13 12:23:43.018
fc7a719c-5a1f-46b1-bcc8-931a056a378e	c08ada98-d190-4cd7-9a03-787e41a5a231	200	5	50	2026-01-13 12:24:12.367
fef785d1-af45-472d-9786-6f6bfe2c261f	c08ada98-d190-4cd7-9a03-787e41a5a231	250	30	10	2026-01-13 13:41:59.943
9adbb140-67aa-4082-b2c4-74d4cd532f9b	c08ada98-d190-4cd7-9a03-787e41a5a231	250	30	10	2026-01-13 13:43:17.849
48166f31-31ce-4bce-8c1c-037bd0b90eb7	c08ada98-d190-4cd7-9a03-787e41a5a231	180	30	10	2026-01-13 13:43:40.559
04e75bad-378d-4cee-acf7-b81740b362e5	c08ada98-d190-4cd7-9a03-787e41a5a231	180	30	10	2026-01-13 13:43:52.45
46732d88-7d58-4716-b76f-ca62a6df2b2c	c08ada98-d190-4cd7-9a03-787e41a5a231	180	30	10	2026-01-13 13:44:44.714
838699ce-4a57-4cc6-b606-aa4b7e580452	c08ada98-d190-4cd7-9a03-787e41a5a231	233	30	10	2026-01-13 13:45:10.5
292e9d1a-03ab-41a0-a25a-bd726ac2aedc	c08ada98-d190-4cd7-9a03-787e41a5a231	233	30	10	2026-01-13 17:11:18.136
8702d285-d242-42b1-9143-361bb842ded1	c08ada98-d190-4cd7-9a03-787e41a5a231	70	30	10	2026-01-14 04:22:28.719
be51ff88-6b2e-4231-9759-43ce17c551fa	c08ada98-d190-4cd7-9a03-787e41a5a231	80	30	10	2026-01-14 04:22:34.159
cc3b90fc-ff00-4d4b-bff9-412e44bbdab9	c08ada98-d190-4cd7-9a03-787e41a5a231	100	30	10	2026-01-14 04:22:38.618
600bb0e2-c50b-4c74-bfe1-f49d2318b92c	c08ada98-d190-4cd7-9a03-787e41a5a231	120	30	10	2026-01-14 04:22:42.097
8957c753-5284-4301-b73c-d2645a747ea5	c08ada98-d190-4cd7-9a03-787e41a5a231	160	30	10	2026-01-14 04:22:46.523
86cfb62d-c90f-4733-8492-32c215f07517	c08ada98-d190-4cd7-9a03-787e41a5a231	190	30	10	2026-01-14 04:22:50.328
bd6844ee-6b1f-403c-bc6f-460480b851c7	c08ada98-d190-4cd7-9a03-787e41a5a231	100	30	10	2026-01-14 04:22:57.106
f84c8afd-b471-4be0-8699-05c9c212012b	c08ada98-d190-4cd7-9a03-787e41a5a231	100	30	10	2026-01-14 04:32:30.499
6e2de581-ec6f-4612-8a52-5f967736a756	c08ada98-d190-4cd7-9a03-787e41a5a231	233	30	10	2026-01-14 04:45:09.055
2585aba6-17a0-4de2-85d6-705b815b3ec2	c08ada98-d190-4cd7-9a03-787e41a5a231	83	30	10	2026-01-14 05:10:18.012
8d6926a0-39e1-4791-a112-d45c57e64c81	c08ada98-d190-4cd7-9a03-787e41a5a231	183	30	10	2026-01-17 05:34:21.569
556ebd94-5b9d-442c-8664-99d37926bb50	c08ada98-d190-4cd7-9a03-787e41a5a231	183	30	10	2026-01-17 06:00:49.244
a25c0325-d080-40ad-bf98-329cd1684541	c08ada98-d190-4cd7-9a03-787e41a5a231	230	30	10	2026-01-17 06:01:34.599
df3d5aae-4983-4f47-9ea3-ef610bbf19a0	c08ada98-d190-4cd7-9a03-787e41a5a231	230	30	10	2026-01-17 06:02:46.318
b776ff56-716e-42e9-9f04-7bdd50fc76e7	c08ada98-d190-4cd7-9a03-787e41a5a231	230	30	10	2026-01-17 07:21:14.384
3427a0d7-9942-4cf7-be41-1d858816d295	c08ada98-d190-4cd7-9a03-787e41a5a231	190	5	50	2026-01-19 07:45:25.823
4320b5f9-b291-4c0c-ae2c-ecd221927f53	c08ada98-d190-4cd7-9a03-787e41a5a231	190	20	50	2026-01-19 07:45:57.088
483143bd-cd36-416d-8a2b-9d1d43dbb8f2	c08ada98-d190-4cd7-9a03-787e41a5a231	790	80	50	2026-01-19 12:35:30.848
743925d7-e47b-4938-897f-084623fb5f01	c08ada98-d190-4cd7-9a03-787e41a5a231	200	80	50	2026-01-19 12:35:58.937
be09f2dd-663a-4157-983e-d9a9e7db1de8	c08ada98-d190-4cd7-9a03-787e41a5a231	190	5	50	2026-01-20 07:56:28.707
935d65f2-622c-44ee-8887-78b1c828a294	c08ada98-d190-4cd7-9a03-787e41a5a231	190	5	50	2026-01-20 07:56:44.127
f57cf1a3-e679-46dc-b606-295fb6d50e1e	c08ada98-d190-4cd7-9a03-787e41a5a231	190	50	50	2026-01-20 07:56:48.974
ba091729-8ec7-4d0e-ab78-b804cc357995	c08ada98-d190-4cd7-9a03-787e41a5a231	100	80	50	2026-01-20 12:16:00.221
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: wintense
--

COPY public."User" (id, email, password, role, "createdAt", phone) FROM stdin;
1352fde5-9aa4-4c78-9356-946208a6000a	test@mail.com	$2b$10$yqvL1GBfItcM7U1WcQMskuzYjXYqDURc.duzw35oDzVL3a0xtQXsq	user	2025-12-17 08:13:20.09	\N
da1ddeec-b448-44ee-9391-248ecf54cff2	testtest@mail.com	$2b$10$COcwhTJumwQBsrbbGP246.Y1ckIglVXibjSjQwjjJmBJ6oGOxBH6u	user	2025-12-17 08:16:18.384	\N
26ba4bbc-7de4-4516-9537-5f132fb7d51e	email1@test.com	$2b$10$aSTgh1V23maLvqf5bCF8cu/pyakmhM5ujTAhok9u4Ek91JU0xrNxu	user	2025-12-17 10:12:18.104	\N
2a4b351a-5fe3-4d63-aa6a-c53951500a82	emaill1@test.com	$2b$10$xMKYNfxBDwClAwMlmLeNIeAdteqRi.mlYKkWXiRhiWSBhLySRjU72	user	2025-12-17 10:13:09.623	\N
f26c84c8-fa48-4c48-8506-68fbf1fa68ee	\N	$2b$10$CVpSE8CLV34cP39deP3c1uFXrbfEb1GcGBcAv8A7fO6JyYRHUGWYS	user	2025-12-17 10:32:53.114	+919876543210
6063cfb7-a5c7-4c9e-8007-00c9a3d0d0ce	testt@mail.com	$2b$10$A0eGId1uqQlgDKxZ3/gyoeXFrFlmOrUM/X2HtCXs28ShMK8Yexizm	user	2025-12-18 05:02:07.364	\N
e71b05e5-c789-48f0-ad35-ca3563db135a	testttt@mail.com	$2b$10$7m/VvP/xh332pxmYur9HZezF/zXMxewFauneQxs4e5uNVvWpP1SXK	user	2025-12-18 05:02:36.286	\N
a279d9b2-fec2-4db6-921c-155290ef75c9	testtt@mail.com	$2b$10$H6tJ8HCnl6rEqjjRVYgBL.z7a5FpAH/2prVfiDf36ibQ6IhR/NZW6	user	2025-12-18 05:05:20.56	\N
a83d735e-a071-4b26-8aac-dbab477c0292	tt@mail.com	$2b$10$ghx.hDGSxDZ2Hy4gf7ujb.J8Suel1xLG2UrNdNs1QsFWWeJhuOtKC	user	2025-12-18 05:38:48.873	\N
94420a95-fc5b-4f6c-b3f1-9a1ebba1f625	t@mail.com	$2b$10$p0qmKUa.eW4hpdy0k5Nekumsh6o14YmMqm5uthkTMnqYi0Oil44H6	user	2025-12-18 06:27:48.206	\N
9a57749f-f70a-4bd7-9d81-0043480b8199	powmik@gmail.com	$2b$10$kXfQIUwN3hO2r2JecGOy.OLtr3qndXrDiMHPN0CSMAW95zZm6NaZq	user	2025-12-18 06:29:44.119	\N
a900f184-5858-465b-b24f-e255734b8393	dikite@gmail.com	$2b$10$7MtsFAYB2cnftPCdt0TqL.0G9X1MKtyh0gtux85QUc3YBVx.vKv2m	user	2025-12-18 06:37:43.065	\N
3c197622-303e-4c92-827a-308e3ffd133d	irfan@gmail.com	$2b$10$YkD4kW.z215vh6NqE6bKxuVCb26HjBswzPeqp8v4z7hAD2oAPYnh.	user	2025-12-18 06:38:16.597	\N
5f8be284-7501-4f45-beae-21af106651fa	helo@gmail.com	$2b$10$WvDGpGlvnsu5yl34KB1UIeNLAxLasQc4n2LbFIm/EWfdX7I/Z81fG	user	2025-12-18 06:49:25.411	\N
cd0c2813-5c42-48c2-84cb-59643aced6b9	testuser@example.com	$2b$10$94GpEEuFSLfK7ycU0rQlsujTnZDPRfKUVfKKOxkylpMgy8f7.VEXW	user	2025-12-18 09:59:58.799	\N
b175358d-449e-49aa-8e2e-7476a066ee1f	kpk@gmail.com	$2b$10$jGM1aI7wXFguhOWIh51w1.QgudOO4htIZcAA1amiS4R4SXlBxxqr2	user	2025-12-18 10:22:42.824	\N
24455c80-6f92-42e6-bfb2-b5850350ca93	tetuser@example.com	$2b$10$gTyxVpv5qDVDKAi4nWDeOu.gCYFd8tJWKYHkXoAxShL3Xlg4t7PPu	user	2025-12-18 11:01:10.857	\N
6c564f00-64e1-4afe-b7e7-2cd282656482	pow@gmail.com	$2b$10$Yi.PZ7AA65V4RoIb46seI.Glgiuirgyse9D0kKeG6jNvSm7iQZDJq	user	2025-12-19 05:27:14.669	\N
9430ce00-c1d5-4c70-8eef-1232dece523a	powm@gmail.com	$2b$10$187GkxzyF2wbkcGO6OTRJuTCBFHfDiXOcXBuvp4hb6XhTGJdnlvbW	user	2025-12-19 05:49:12.723	\N
c8fcd275-0382-4538-91c9-7b9371eb8d34	ahamedi987@gmail.com	$2b$10$zh/gOfnqXkucQDHMZ9DzHuPllO6I/oQM0WzOURgkG1ptTCC3yMi66	user	2025-12-22 05:04:06.761	\N
eb50d4c5-22ad-4eaf-8a40-cde000cc13bd	ahamedirfan@mail.com	$2b$10$zXgFDz1ClMESftTRcP7e5ukyIJFqNabuxhZ4j4UwbtzzJYO.yQxzi	user	2025-12-22 05:09:00.188	\N
ba0f42a6-41e8-4868-ac41-e71af0a57682	\N	$2b$10$AmsEfPu24akOxI5Y.iNJsufM6wLlVL8l2VGqckNPcOSrs9FLYODH6	user	2025-12-22 06:07:34.267	9123456789
18c2562e-7294-49d2-822e-eb2f9b80939f	powmi@gmail.com	$2b$10$5inz.qJJxlSEP1xldO5PJ.bnTPGzfVZP2UMtyXPazR797eYCqAvrm	user	2025-12-22 06:22:16.999	\N
c8d2b9ca-0e52-4dcb-a8c0-48c72dbaf67e	ka@gmail.com	$2b$10$jEoiA7DDE7SvQNeVRJvHpexr/WcRNfD6Vd9B.hKMh9c3o.7/oF1Ja	user	2025-12-23 04:55:49.875	\N
122d6ed6-96ba-4aee-b00f-692a91696c2e	al@gmail.com	$2b$10$CgFQGqN1RuDpgzduWK0GkuSPU6HfwadmeuPJye2oyKuAr.MurI0BW	user	2025-12-23 05:45:23.881	\N
231db93f-ea46-4ec6-bd6d-fbf1e8c84891	aha@mail.com	$2b$10$cXlcqNGzcmp4QdqGQ9JrhuevJh8QQ3c4QuMsvb/ZqO5Z0jtAF6Mye	user	2025-12-29 06:16:37.933	\N
ec9f5e51-59f6-4315-8e6a-acfb5a9b66da	irfan@dikite.com	$2b$10$PLIpqCd.uuUDfKIEHCbJSOid15WL1.DvyzTTqdw8zvbncmKmhn/Ta	user	2025-12-22 05:09:54.808	\N
28a2aa39-bcbf-4374-af5d-c4c3bdf1812f	kalai@dikite.com	$2b$10$eUf2GaI3AS7x3tnFrcdB/OJP45EcarzWYXVnOD/Pwo0JQp90GYM.e	user	2026-01-09 09:00:18.906	\N
7607e931-a994-4d58-8cf4-837c573f0c64	ahamed@dikite.com	$2b$10$JMNRiNW2zZBLoL8CXvKHnuiCvX9KBj6lv5arO4l4b3ZSS2uyrmirm	user	2026-01-12 11:08:12.676	\N
5e7baab9-4efc-4500-9f25-879ec40b8e3f	ahamed@gmail.com	$2b$10$bLRXICy1QlideVoXEFUTSeIvs.1ouPqKPnKI4wNLDRJrtYy6UahvS	user	2026-01-12 11:09:03.242	\N
8650224c-714d-474d-814a-28854e54359e	ahamedirfan@gmail.com	$2b$10$FXcI5a6mD8dQPCg2PzZjjuNISAFcWj5nagmyy28KZmqs4g.OvKDka	user	2026-01-12 11:17:28.397	\N
90fa8564-6c17-4f52-92c8-8fcafe02ecc0	ahamedirfani@gmail.com	$2b$10$W7AvBXmBsRS8/emNVuZbZujmaikaKfLdcZndWH.r8e2gvStvtEDG.	user	2026-01-12 11:18:12.71	\N
031dd7a7-d4c0-4e76-bf7e-9ccba2995b39	ahamedirfani@gmail.comm	$2b$10$OSEaVBBZPn2b/l8wSD/WMOM8sLQNNN.CwAtoo7BDZb3fjsukiqYEe	user	2026-01-12 11:18:33.512	\N
dce6ac98-c0a0-42e2-be4b-9417864a8c66	britto@dikite.com	$2b$10$XasHSVh0VZJu9AJGrhWEdOWcjNDBeLUOCcwIu/2LZiSDYjgCOvGe6	user	2026-01-12 11:27:43.302	\N
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: wintense
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
abeed0c4-53bf-477d-8c7b-0202f9ba4efc	bf90a4d5603b4e1316b8d4b2998fe58f764dd149b2d7be8acafa71d001d52a27	2025-12-17 07:47:25.369629+00	20251217074725_init	\N	\N	2025-12-17 07:47:25.31177+00	1
13d4116a-d4f6-459b-b79d-56676f6d9cc0	3dfb2759167aa69bb76475746ddf6c186ddca2f57f0c16d57687467c46b8e431	2025-12-17 10:32:45.309048+00	20251217103245_add_phone_to_user	\N	\N	2025-12-17 10:32:45.265577+00	1
d4d99e7d-c504-42f5-aafc-c602f35fa60c	7457cfb5651c40fc28c50eaf35b4ad97d053d9f9899089c035dd64254dcf0670	2025-12-18 04:47:29.94022+00	20251218044729_telemetry_init	\N	\N	2025-12-18 04:47:29.824438+00	1
2a87f3f7-b95e-40ee-9a7b-140952014713	5da46837acb5e82667f741cf7ba3b911aa14dcb8c0ad28862e4de8129738bd06	2025-12-18 07:19:25.781461+00	20251218071925_alerts_init	\N	\N	2025-12-18 07:19:25.67322+00	1
5516a9c2-e2b9-4931-87da-7125a8a1b7f4	17eb8322f2e781571725aaf52186ab4665ebda5f486916429cbd81c1e64b4d9b	2026-01-08 05:40:33.729986+00	20260108054033_add_medical_vitals	\N	\N	2026-01-08 05:40:33.659602+00	1
a69a0e5f-eba9-4d29-91f4-00eb5cdffd39	4b2c1a89bfcd86237cb266e25c859343b2c5c32c94e91f86408500e77c55af1b	2026-01-08 06:23:03.435488+00	20260108062303_ecg_fix	\N	\N	2026-01-08 06:23:03.423525+00	1
c7760966-42cf-46fa-bb88-ad520dc2f99c	3798b467cb71181cdb3050edc818a7d9e8b3e962fb7af3c5dbfd367ebd925c51	2026-01-08 07:23:03.171857+00	20260108072303_add_ecg_summary_relation	\N	\N	2026-01-08 07:23:03.145049+00	1
59562d69-91b4-4886-b5e2-ae3a3a59c8a1	2d0aae16b3e9a396568051b218f6640f84dd9304794ef4448916aecc13c0adf3	2026-01-13 06:56:55.757271+00	20260113065655_add_spo2	\N	\N	2026-01-13 06:56:55.696243+00	1
17a2e2ad-8e36-4bdd-9f57-b5dac3f64ea1	e13619e763d21d660cecf652b9a643d2b72bc9b4c75a81452558f73f3c368c97	2026-01-13 07:16:25.574599+00	20260113071625_add_spo2	\N	\N	2026-01-13 07:16:25.56108+00	1
78f3f44c-3ba3-4bef-b9bb-5924b8dac151	d944e20fed22ae6bf8dbe3975c763ffac2284751c12241940881b73d03c5d1e7	2026-01-13 07:48:38.069311+00	20260113074838_add_spo2	\N	\N	2026-01-13 07:48:38.048113+00	1
49ec9d13-63f4-498b-8149-94a2a110c890	09a3f4fd4e405041d15578031a0a7c7047e6cedc6ef4a7162692f491e0b1cdaf	2026-01-19 06:48:49.187573+00	20260119064849_add_ecg_medical_fields	\N	\N	2026-01-19 06:48:49.176197+00	1
3163bf40-2d1f-426c-942b-aefc57add841	e450dc977f02c81c843d0ec2e5547685a87e4cd9144ce46c39e7f7f666cb6dc2	2026-01-20 07:50:29.046328+00	20260120075029	\N	\N	2026-01-20 07:50:29.029749+00	1
e307dda4-a8c7-451c-a281-63f4a26257a1	0e68074b33ff6b8e011f3d18529bc3d8e54302fab354bd048fcbf3daaa0e7312	2026-01-20 08:25:06.900641+00	20260120082506	\N	\N	2026-01-20 08:25:06.89068+00	1
c8bd9a37-d914-4a90-97f9-d105bcc26301	75f113b8dff6ce0b23451b0f0ac89e2181c331ff9468a7ef5193c99b7dba15b5	2026-01-20 08:54:58.444665+00	20260120085458_y	\N	\N	2026-01-20 08:54:58.417721+00	1
\.


--
-- Name: Alert Alert_pkey; Type: CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."Alert"
    ADD CONSTRAINT "Alert_pkey" PRIMARY KEY (id);


--
-- Name: Device Device_pkey; Type: CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."Device"
    ADD CONSTRAINT "Device_pkey" PRIMARY KEY (id);


--
-- Name: ECGSummary ECGSummary_pkey; Type: CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."ECGSummary"
    ADD CONSTRAINT "ECGSummary_pkey" PRIMARY KEY (id);


--
-- Name: ECG ECG_pkey; Type: CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."ECG"
    ADD CONSTRAINT "ECG_pkey" PRIMARY KEY (id);


--
-- Name: SpO2Sample SpO2Sample_pkey; Type: CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."SpO2Sample"
    ADD CONSTRAINT "SpO2Sample_pkey" PRIMARY KEY (id);


--
-- Name: Telemetry Telemetry_pkey; Type: CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."Telemetry"
    ADD CONSTRAINT "Telemetry_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: SpO2Sample_deviceId_createdAt_idx; Type: INDEX; Schema: public; Owner: wintense
--

CREATE INDEX "SpO2Sample_deviceId_createdAt_idx" ON public."SpO2Sample" USING btree ("deviceId", "createdAt");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: wintense
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: wintense
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- Name: Device Device_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."Device"
    ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ECGSummary ECGSummary_deviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."ECGSummary"
    ADD CONSTRAINT "ECGSummary_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES public."Device"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ECG ECG_deviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."ECG"
    ADD CONSTRAINT "ECG_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES public."Device"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SpO2Sample SpO2Sample_deviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."SpO2Sample"
    ADD CONSTRAINT "SpO2Sample_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES public."Device"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Telemetry Telemetry_deviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wintense
--

ALTER TABLE ONLY public."Telemetry"
    ADD CONSTRAINT "Telemetry_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES public."Device"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict 3M1zriLH9ikDLQly4t3U3GKheyntasZw2dtXwVqwi7aI6XlECzPivCg00RicRla

