# CLAUDE 指南

本文件用于记录项目标准文档路径、开发流程、日志规范和工作说明。

## 目录说明
- `docs/requirements.md`：项目需求、MVP 功能、用户场景、范围界定。
- `docs/architecture.md`：数据模型、页面结构、模块分层、技术架构说明。
- `docs/design-guidelines.md`：UI 设计规范、配色、排版、交互、响应式原则。
- `docs/development-plan.md`：阶段计划、优先级、验收标准、开发里程碑。
- `docs/data-format.md`：静态数据文件格式和扩展规则。
- `dev-logs/`：每日开发日志目录，记录完成事项、问题、待办。
- `src/data/`：静态 JSON 数据文件目录（宝可梦、招式、属性克制表等）。

## 本地运行

项目为纯静态站点，需通过 HTTP 服务器访问（直接打开 `index.html` 会导致 `fetch` 跨域错误）。

```bash
# 方式一：使用 npx serve
npx serve src

# 方式二：使用 Python
python3 -m http.server -d src
```

## 工作说明
1. 开发前先阅读 `docs/development-plan.md` 确认当前阶段任务。
2. 所有设计、架构和需求变更应同步到 `docs/` 对应文件中。
3. 每个工作日结束前，在 `dev-logs/` 新建或更新当天日志文件。
4. 日志文件格式遵循 `dev-logs/README.md` 中的模板。
5. 新增数据时，请优先修改 `docs/data-format.md` 并保持 `src/data/` 文件结构一致。

## 如何使用
- 开发人员：阅读 `CLAUDE.md` 后，先检查 `docs/development-plan.md` 中当前任务。
- 设计人员：参考 `docs/design-guidelines.md` 执行 UI 与交互规范。
- 数据维护人员：按 `docs/data-format.md` 添加或更新 `src/data/` 中的 JSON 文件。

## 项目目标
- 先实现 MVP：图鉴查询、属性克制、速度线、伤害计算器。
- 后续保持可扩展：静态数据可新增宝可梦、招式、特性、道具。
- 设计风格：简洁直观，主色调淡蓝色，支持桌面与移动体验。
