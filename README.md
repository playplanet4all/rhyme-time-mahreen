# ⭐ Rhyme Time — for Mahreen

A 10-question rhyming game for children under 10, from **Yusrah** to **Mahreen**, in black and white (the emoji pictures bring the colour).

**Screens:** Intro → 10 picture questions (5 "which word rhymes?" + 5 finish-the-nursery-rhyme) with a gentle 30-second sand-timer, a "Help me" hint, and a 🔊 "Read it to me" voice → a reward sticker, stars, confetti, "Send my stars to Yusrah" on WhatsApp, and **Play again** for the next child.

Plain HTML/CSS/JS. No build step. Runs on GitHub Pages as-is.

---

## 1. Personalise (everything is at the top of `script.js`)

### `CONFIG`

| Field | What it does |
|---|---|
| `from`, `to` | Names used in texts (`{from}`, `{to}`) |
| `greeting`, `introText` | Words on the first screen |
| `timerSeconds` | Seconds per question (`30`). `0` turns the timer off. Running out never scolds: it just shows the answer kindly |
| `sound.readAloud` | Shows the 🔊 "Read it to me" button (uses the phone's built-in voice) |
| `sound.autoRead` | Reads each question out loud automatically |
| `sound.effects` | Little "ding" sounds. The 🔊/🔇 button in the corner mutes everything |
| `sound.voiceLang` | Voice accent: `"en-GB"`, `"en-US"`, `"en-IN"` |
| `badges` | Reward sticker, title and message by number of stars. Every level is encouraging |
| `signoff` | "— Eden👲" |
| `whatsapp.number` | Number that receives the stars (`917989381957`). `""` hides the button |
| `whatsapp.buttonText`, `text` | Button label and message (`{stars}` and `{total}` are filled in) |
| `brand.show` | "Made with Play Planet" line. **Off**, as requested |

### `QUESTIONS`

- `q`: the question. Put `*stars*` around a word to underline it (e.g. `*cat*`).
- `options`: four `{ emoji, word }` pictures. `correct`: index of the right one (`0` = first). The pictures are shuffled every play.
- `right` / `wrong`: what she sees and hears after answering (keep them kind). `hint`: shown on "💡 Help me".
- The nursery rhymes used are traditional and in the public domain.

## 2. Test locally

```bash
cd mahreen-rhyme-time
python3 -m http.server 8000
```

- Open **http://localhost:8000/** (this game sends no notifications, so `?quiet` isn't needed, but it's harmless).
- On a phone (same Wi-Fi): `http://<your-computer-IP>:8000/`. Turn the phone's volume up to hear the voice.
- On desktop: DevTools → device toolbar → a 360px-wide phone.

## 3. Push to GitHub (its own repository)

Create an **empty** repo on GitHub first (no README), e.g. `rhyme-time-mahreen`.

```bash
cd mahreen-rhyme-time
git init            # skip if the folder already has a .git
git add .
git commit -m "Rhyme Time for Mahreen ⭐"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 4. Turn on GitHub Pages

Repo → **Settings → Pages → Deploy from a branch → `main` / `(root)` → Save**.
Your link: `https://<your-username>.github.io/<repo-name>/`

## 5. After every change

Bump the version in **both** lines of `index.html` (`?v=1` → `?v=2`), then:

```bash
git add . && git commit -m "Rhyme Time: <what changed>" && git push
```

## 6. Notes

- **Child-safe by design:** no notifications, no data collected, no tracking. The only thing that leaves the phone is the WhatsApp message, and only if someone taps the button and presses send.
- Not included, on purpose: the countdown (there's no event) and the runaway "No" button (there's no yes/no question, and it isn't suitable for young children).
- The read-aloud voice depends on the phone; if a device has no voice, the button simply does nothing harmful and the game still works.
- Reduced motion is respected. Google Fonts is the only outside resource.
