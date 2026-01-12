# 🧮 Body Mass Index (BMI)

>*A practical, scientific, and developer-friendly guide — casual, precise, and useful.*

## What is BMI (short)

BMI is a simple index that relates mass to height. Public‑health folks use it for quick screening and population monitoring because it's cheap, standardized, and easy to compute. It doesn't measure body fat directly, so treat it like a clue, not a verdict.

## The official formula

BMI = weight (kg) / [height (m)]²


Example: weight = 70 kg, height = 1.75 m → BMI = 70 / 1.75² ≈ 22.9 (Normal).

### Unit conversions (quick)

- cm → m: divide by 100 (170 cm → 1.70 m)  
- ft & in → m: total_inches = ft * 12 + in; meters = total_inches * 0.0254  
- lb → kg: kg = lb * 0.45359237

Always convert inputs to kilograms and meters before applying the formula.

---

## WHO adult categories

- **Underweight:** BMI less than 18.5  
  _Consider nutrition assessment_

- **Normal weight:** BMI 18.5 to 24.9  
  _Healthy range for most adults_

- **Overweight:** BMI 25.0 to 29.9  
  _Increased health risk_

- **Obesity — Class I:** BMI 30.0 to 34.9  
  _Higher risk_

- **Obesity — Class II:** BMI 35.0 to 39.9  
  _Even higher risk_

- **Obesity — Class III:** BMI 40.0 or higher  
  _Very high risk_

> Note: Some populations (for example, many Asian groups) may use lower BMI thresholds for increased cardiometabolic risk. See References for regional guidance.

---

## When to use BMI — and when not to

Use BMI for:
- Screening adults (18+)
- Population surveillance and dashboards
- Quick risk stratification in primary care

Don't rely on BMI alone for:
- Children and adolescents (use BMI‑for‑age percentiles)
- Pregnant people
- Athletes with very high muscle mass
- Elderly people where body composition changes matter

If you need more accuracy, add waist circumference, waist‑to‑height ratio, or clinical assessment.

---

## Limitations (short and honest)

BMI ignores body composition. Two people with the same BMI can have very different health profiles — one might be muscular, the other carrying more fat. BMI also doesn't capture fat distribution (visceral vs subcutaneous), which affects metabolic risk.

Complementary measures:
- Waist circumference: typical adult cutoffs often cited — men > 102 cm, women > 88 cm (higher risk)  
- Waist‑to‑height ratio: > 0.5 often used as a simple risk flag

---

## FAQs

**Q:** *Do men and women get different BMI formulas?*  
**A:** Nope! The BMI formula is universal: everyone uses weight in kilograms divided by height in meters squared. The WHO adult categories are also the same for both men and women. While doctors might interpret results a bit differently depending on your health background, the math itself doesn’t care about gender.


**Q:** *Why does my BMI look totally wrong if I enter centimeters instead of meters?*  
**A:** Classic mistake! BMI expects your height in meters, not centimeters. If you forget to convert (say, you enter 170 instead of 1.70), your BMI will be off by a factor of 10,000—like, “space alien” numbers. Always divide your height in cm by 100 before plugging it into the formula.


**Q:** *What about kids and teens—can I use this calculator for them?*  
**A:** Not really! For anyone under 18, BMI is interpreted using age- and sex-specific percentiles (think growth charts, not adult cutoffs). Kids and teens are growing fast, so their healthy ranges change as they age. Check out the CDC or WHO growth charts for the right info.

---

## References & further reading

- World Health Organization — Obesity and overweight (factsheet): [https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight](https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight)  
- WHO publications (for technical reports and consultations): [https://www.who.int/publications](https://www.who.int/publications)  
- CDC — Child and Teen BMI (growth charts): [https://www.cdc.gov/growthcharts/](https://www.cdc.gov/growthcharts/)  
- NICE — Identification, assessment and management of overweight and obesity (CG43): [https://www.nice.org.uk/guidance/cg43](https://www.nice.org.uk/guidance/cg43)
