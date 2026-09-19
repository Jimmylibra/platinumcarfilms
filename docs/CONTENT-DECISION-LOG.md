# Content decision log

Client questions for the Sunday meeting (plan section 15), with the exact
conflicting passages found. Nothing below has been silently resolved --
source content is preserved as-is in the site pending these answers.

| # | Finding | Where | Needs |
| --- | --- | --- | --- |
| 1 | Two different phone numbers appear across the site (+86 181 2245 8657 and +86 153 3807-7719), and About page email may differ from footer contact | Footer, About source | Confirm which numbers/email are current and authoritative |
| 2 | Warranty duration and transferability terms conflict between the general warranty page and the headlight-film product page | `docs/policies/warranty-policy-review.html`, headlight product source | Confirm one consistent set of terms per product |
| 3 | Platinum 210 page uses thickness terminology that may be technically incorrect | `docs/site-audit/source/210-paint-protection-film.html` | Confirm correct thickness spec before content is finalized (route/layout is not blocked) |
| 4 | Gloss-black product page contains satin-related comparison copy (pasted from the wrong page) | `docs/site-audit/source/gloss-black-paint-protection-film-190-microns.html` | Supply correct gloss-black comparison text |
| 5 | Marketing claims ("10-year warranty", "certified installation") appear in every product description with no supporting evidence found in source | `content/index.json` product descriptions | Confirm what remains publishable; these are currently preserved verbatim, not removed or invented |
| 6 | Partner flags shown on Home/About have no confirmed relationship or usage permission on file | Home/About partner section | Confirm which partnerships are real and approved to display |
| 7 | The 40 local gallery photos are factory/production images, not customer installations -- and are a subset of the source site's claimed 136 gallery images | `docs/site-audit/assets.csv`, Gallery page | Confirm which of the 136 are approved to use and their usage rights |
| 8 | Shipping, Refund, Privacy policies are compliance-ready drafts (GDPR/PIPL/Gulf-region) but explicitly not lawyer-finalized; Terms & Conditions was never actually written on the source site (generic WordPress placeholder only) | `docs/policies/*.html`, `pages/Terms.tsx` | Legal sign-off on the three drafts; real terms content needs to be written from scratch |
| 9 | Editorial artifacts like "Feature / NLP Entity" labels appear in the approved homepage mock's material-feature cards | `mock/index.html`, ported into `Home.tsx` | Approve removing these labels from the public-facing copy |
| 10 | No backend exists for the inquiry/newsletter forms; current behavior is local-only with an explicit "not sent" message | `replica/StaticForm.tsx` | Confirm the intended inquiry destination and process before any backend work begins (not started, per the plan's static-only scope) |
| 11 | About page lists a third distinct contact email (`platinumcarfims@gmail.com`, note the missing "l") that appears nowhere else on the site (footer/Contact use `info@platinumcarfilms.com`) | `content/about-us.json` "Start a Conversation" section | Confirm which email is current; likely a typo on the source site, but not assumed here |
| 12 | Warranty FAQ answer to "What does the Platinum Car Films PPF warranty cover?" begins mid-sentence in the source itself ("than 2% annually is acceptable)...") — not a parsing artifact, the source content is genuinely truncated | `content/warranty.json` FAQ accordion | Needs the missing opening clause supplied before publish |
| 13 | Warranty page states "Non-Transferable" as a headline badge, and one FAQ confirms "No, it is a non-transferable warranty" — consistent within this page, but conflicts with item 2 above (warranty duration/transferability inconsistency vs. the headlight product page) | `content/warranty.json` | Resolve as part of item 2 |

These block final content/business approval, not further layout implementation.
