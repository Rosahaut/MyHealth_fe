# Ohjemistotestaus - yksilötehtävät

## Tehtävä 1

Tässä tehtävässä tuli ladata Robot Framework ja siihen vaadittavat kirjastot:
- [Robot Framework](https://robotframework.org/)
- [Robot Framework Browser](https://robotframework-browser.org/)
- [Robot Framework Requests](https://marketsquare.github.io/robotframework-requests/doc/RequestsLibrary.html)
- [CryptoLibrary](https://pypi.org/project/robotframework-cryptolibrary/)
- [Robotidy](https://robotidy.readthedocs.io/)

## 1. Suoritetut Asennusvaiheet
Kaikki asennukseen liittyvät komennot suoritin VSCoden terminaalissa.

### 1.1 Pythonin asentaminen
Python oli jo asennettuna, version tarkistin komennolla:
```bash
python --version
```
Tulos: **Python 3.13.1** 

### 1.2 Virtuaaliympäristön luominen
Virtuaaliympäristön luonti ja aktivointi:

Tämän suoritin antamalla seuraavat komennot:
```bash
python -m venv venv
source .venv/Scripts/activate
```

Jotta virtuaaliympäristön tiedostot eivät kopioidu GitHub-kansioon, lisäsin .gitignore -tiedostoon seuraavan rivin:
```bash
.venv
```

Kun virtuaaliympäristö oli aktivoitu, tarkistin että python pakettien asentaja (pip), oli päivitetty viimmeisimpään versioon. Tämä tapahtui komennolla:
```bash
python -m pip install --upgrade pip
```
Tulos: **Successfully installed pip-25.0.1** 

### 1.3 Robot Frameworkin asennus
Seuraavaksi asensin Robot Frameworkin terminaalissa komennolla:
```bash
pip install robotframework
```
Tulos: **Successfully installed robotframework-7.2.2** 

Robot Framework asennuksen tarkistin vielä suorittamalla komennon:
```bash
robot --version
```
Tulos: **Robot Framework 7.2.2** 

### 1.4 Browser Libraryn asennus ja alustaminen
koska Browser library tarvitsee sekä Pythonin että Node.js toimiakseen. tarkistin Node.JS asennuksen komennolla:
```bash
node -v
```
Tulos: **v22.13.0** 

Browser library -kirjaston ja selainajurit asensin seuraavaksi antamalla komennon:
```bash
pip install robotframework-browser
```
Tulos: **Successfully installed click-8.1.8 colorama-0.4.6 grpcio-1.70.0 grpcio-tools-1.70.0 natsort-8.4.0 overrides-7.7.0 protobuf-5.29.3 robotframework-assertion-engine-3.0.3 robotframework-browser-19.4.0 robotframework-pythonlibcore-4.4.1 seedir-0.5.0 setuptools-76.0.0 wrapt-1.17.2** 

Kirjaston alustin komennolla:
```bash
rfbrowser init
```

### 1.5 Requests libraryn, Cryptolibraryn ja Robotidyn asennus
Tarvittavat kirjastot asensin komennoilla:
```bash
pip install robotframework-requests
pip install --upgrade robotframework-crypto
pip install robotidy
```
Tulos (robotframework-requests): **Successfully installed certifi-2025.1.31 charset-normalizer-3.4.1 idna-3.10 requests-2.32.3 robotframework-requests-0.9.7 urllib3-2.3.0**

Tulos (--upgrade robotframework-crypto): **Successfully installed PyNaCl-1.5.0 cffi-1.17.1 prompt_toolkit-3.0.50 pycparser-2.22 questionary-2.1.0 robotframework-crypto-0.4.2 wcwidth-0.2.13**

Tulos (robotidy): **Successfully installed MarkupSafe-3.0.2 jinja2-3.1.6 markdown-it-py-3.0.0 mdurl-0.1.2 pathspec-0.12.1 pygments-2.19.1 rich-13.9.4 rich_click-1.8.5 robotframework-tidy-4.16.0 tomli-2.2.1 typing_extensions-4.12.2**

### 1.6 Asennuslistan tarkistus
Tarkistin asennuslistan listaamalla kaikki nykyisessä Python-ympäristössä asennetut paketit ja niiden versiot. Tämän suoritin antamalla komennon:
```bash
pip freeze
```
Tulos:
```bash
...
robotframework==7.2.2
robotframework-assertion-engine==3.0.3
robotframework-browser==19.4.0
robotframework-assertion-engine==3.0.3
robotframework-crypto==0.4.2
robotframework-pythonlibcore==4.4.1
robotframework-requests==0.9.7
robotframework-tidy==4.16.0
...
```

### 1.7 requirements.txt-asennuslistan luominen
Seuraavaksi ohjasin pip freeze-komennon luettelo tiedostoon käyttämällä uudelleenohjausta. Tämä tapahtui komennolla:

```bash
pip freeze > requirements.txt
```
Tämä loi requirements.txt-tiedoston, joka sisältää kaikki nykyisessä ympäristössä asennetut paketit ja niiden versiot. Tämän tiedoston avulla voi asentaa samat paketit toisessa ympäristössä käyttämällä seuraavaa komentoa:

```bash
pip install -r requirements.txt
```

### 1.8 Asennusten testaus
Seuraavaksi Kopioin opettajalta saadun asennustesti.py esimerkki tiedoston omaan projektiini kansioon tests ja ajoin se.

Tulos:
```bash
Python: 3.13.1 (tags/v3.13.1:0671451, Dec  3 2024, 19:06:28) [MSC v.1942 64 bit (AMD64)]
Robot Framework: 7.2.2
Browser: 19.4.0
requests: 2.32.3
CryptoLibrary: 0.4.2
``` 