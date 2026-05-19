# 数据格式规范

## 目标
确保静态数据文件结构清晰、可扩展，便于后续新增宝可梦、招式、特性、道具。

## 数据文件列表
- `data/pokemon.json`
- `data/moves.json`
- `data/abilities.json`
- `data/items.json`
- `data/type-chart.json`

## 约定
- 每个对象应包含唯一 `id`。
- 名称字段使用 `name`。
- 多值字段使用数组。
- 数据类型尽量明确，避免混合字符串与数字。

## 示例字段说明
- `pokemon.json`
  - `id`: 唯一数值标识
  - `name`: 宝可梦名称（中文）
  - `types`: 属性数组
  - `baseStats`: 种族值对象 { hp, atk, def, spa, spd, spe }
  - `abilities`: 特性名称数组
  - `moves`: 默认可选招式名称数组
  - `image`: 标准形态图片URL
  - `forms`: 特殊形态数组（可选）
    - `name`: 形态名称（如 "Mega妙蛙花"、"极巨皮卡丘"）
    - `image`: 形态图片URL
    - `type`: 形态类型 (可选，"mega" / "gigantamax" / 其他)
  - 扩展预留：`altforms`, `gigantamax`, `dynamax`, `totem` 等字段可由用户自定义

- `moves.json`
  - `id`: 招式唯一 ID
  - `name`: 招式名称
  - `type`: 属性
  - `category`: 物攻 / 特攻 / 变化
  - `power`: 威力
  - `accuracy`: 命中率
  - `pp`: PP

- `type-chart.json`
  - `attackType`: 属性名称
  - `defenses`: 各属性倍率映射

## 图片来源
- 推荐使用 PokeAPI 官方图片源：`https://raw.githubusercontent.com/PokeAPI/sprites/master/pokemon/other/official-artwork/{id}.png`
- 若无法获取图片，系统自动使用占位符
- 可选使用本地图片服务，路径格式 `/images/pokemon/{id}.png`

## 形态系统扩展规则
1. **基础形态**：每个宝可梦都有至少一个标准形态
2. **Mega进化**：标记 `type: "mega"`，可有多个（如Mega-X、Mega-Y）
3. **极巨化**：标记 `type: "gigantamax"`
4. **其他形态**：可扩展支持
   - 地区形态（Regional form）
   - 性别差异形态
   - 时间限制形态（如晨间护城龙/黄昏护城龙）
   - 自定义形态分类

## 扩展规则
1. 新增宝可梦时需要：
   - 添加到 `pokemon.json`
   - 提供 `image` 字段（图片URL）
   - 若有特殊形态，在 `forms` 数组中添加
   
2. 若新宝可梦拥有新特性或新招式，先在 `abilities.json` 或 `moves.json` 中定义。

3. 若规则变更，优先更新 `type-chart.json` 和本文档。

4. 所有数据更新应保持 JSON 格式合法，并通过文本格式检查。

## Pokemon 数据示例
```json
{
  "id": 150,
  "name": "超梦",
  "types": ["超能"],
  "baseStats": { "hp": 106, "atk": 110, "def": 90, "spa": 154, "spd": 90, "spe": 130 },
  "abilities": ["精神力"],
  "moves": ["精神冲击", "念力"],
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/pokemon/other/official-artwork/150.png",
  "forms": [
    { "name": "标准形态", "image": "...", "type": "standard" },
    { "name": "Mega超梦X", "image": "...", "type": "mega" },
    { "name": "Mega超梦Y", "image": "...", "type": "mega" },
    { "name": "极巨超梦", "image": "...", "type": "gigantamax" }
  ]
}
```