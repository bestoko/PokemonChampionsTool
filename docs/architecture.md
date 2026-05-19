# 架构与数据模型

## 目录结构建议
- `src/`：前端代码目录
- `data/`：静态数据目录
- `docs/`：项目文档目录
- `dev-logs/`：每日开发日志

## 数据模型
静态数据以 JSON 文件存储，按对象类型分离，便于维护与扩展。

建议数据文件：
- `data/pokemon.json`
- `data/moves.json`
- `data/abilities.json`
- `data/items.json`
- `data/type-chart.json`

### 宝可梦对象示例
{
  "id": 1,
  "name": "妙蛙种子",
  "types": ["草", "毒"],
  "baseStats": {"hp": 45, "atk": 49, "def": 49, "spa": 65, "spd": 65, "spe": 45},
  "abilities": ["茂盛", "叶绿素"],
  "moves": ["藤鞭", "生长"],
  "evolution": {"next": 2}
}

### 属性关系
- `type-chart.json` 使用属性相克矩阵或映射表示，支持 18 种属性组合结果。
- 属性倍率建议使用 `2`、`1`、`0.5`、`0` 表示。

## 页面结构
- 首页：功能入口、项目简介
- 图鉴查询页：搜索、过滤、列表、详情卡片
- 属性克制页：属性输入、克制结果展示
- 速度线页：速度比较控制器、排名/区间展示
- 伤害计算页：战斗选择面板、结果展示

## 技术架构建议
- 采用前端静态站点架构。
- 可使用轻量框架（例如 React、Vue、Svelte），也可以先用纯 HTML/CSS/JS。
- 数据读取通过静态 JSON 加载，前端负责过滤与展示。

## 扩展策略
- 添加新宝可梦时只需更新 `data/pokemon.json`。
- 添加新招式时更新 `data/moves.json`。
- 特性、道具、规则扩展同样采用 JSON 数据文件。
- 规则变更优先更新 `type-chart.json` 和 `docs/data-format.md`。