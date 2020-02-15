# README

I'm too lazy to keep manually fill up the temperature recording form twice daily so I employ `puppeteer` to do this for me

# Note

Automated submission of form is disabled by default

Ensure the details are correct before submitting the form manually

# Command

`node . [name] [id] [pc] [type] [temp]`

- name:
  - full name
  - default: `name`
- id:
  - pass id
  - default: `id`
- pc:
  - unique identifier of your PC (does not have to be in full)
  - e.g National En
  - default: `C3 De`
- type:
  - 1 = In-source/contract/temp staff
  - 2 = Interns
  - default: `1`
- temp:
  - temperature (deg c)
  - default: `3`

# How to

1. Run `npm ci`
2. Edit `package.json` and/or `imlazy.bat` to fill up your own info `[name, id, pc, type, temperature]`
3. Run `npm run imlazy` or `imlazy.bat`
4. Watch it fill up your info
5. ...
6. PROFIT!!!
