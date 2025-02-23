const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); // 引入 pg 模块
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 创建 PostgreSQL 连接池
const pool = new Pool({
  user: process.env.DB_USER, // 数据库用户名
  host: process.env.DB_HOST, // 数据库主机
  database: process.env.DB_NAME, // 数据库名称
  password: process.env.DB_PASS, // 数据库密码
  port: process.env.DB_PORT, // 数据库端口 (默认 5432)
});

// 测试数据库连接
pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// 新增 API 端点：获取数据库中的数据
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users"); // 查询 users 表
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
