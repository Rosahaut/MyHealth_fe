*** Settings ***
Library    Browser    auto_closing_level=KEEP
Resource   Keywords.robot  

*** Test Cases ***
Login to MyHealth
    
    New Browser    chromium    headless=No
    New Page    http://localhost:5173/  

    # Klikkaa login-modal auki
    Click    id=openLoginModal
    Wait For Elements State    id=loginModal    visible

    # Kirjoita käyttäjätunnus ja salasana
    Type Text    css=#loginModal input[name="username"]    ${Username}    delay=0.1 s  
    Type Secret  css=#loginModal input[name="password"]    $Password      delay=0.1 s  

    # Klikkaa kirjautumispainiketta
    Click    css=#loginModal button.loginuser  