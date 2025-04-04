*** Settings ***
Library     Browser     	    auto_closing_level=SUITE
Library     CryptoLibrary     variable_decryption=True   #Kryptatut muuttujat puretaan automaattisesti

*** Variables ***
${Username}    crypt:Aaxk2uyVexr+5cDWn7qlr1hI1bnza2YVvBvdB9/AUhS19bNghpKEZ/4QqbLRc2dpEq3X8ZPY7yg=
${Password}    crypt:Wa07dhSDMUozeRABOSZHi2Nf4Geeds/HVFPQYgsG+DmR6Un6juu8pK6rx90m/wL25O/5/0PeQNr9SzuDEA== 

*** Test Cases ***
Login to MyHealth
    New Browser     chromium    headless=No
    New Page    http://localhost:5173/

    # Klikkaa login-modal auki
    Click    id=openLoginModal
    Wait For Elements State    id=loginModal    visible

    # Kirjoita käyttäjätunnus ja salasana
    Type Text    css=#loginModal input[name="username"]    ${Username}    delay=0.1 s  
    Type Secret  css=#loginModal input[name="password"]    $Password      delay=0.1 s  

    # Klikkaa kirjautumispainiketta
    Click    css=#loginModal button.loginuser 