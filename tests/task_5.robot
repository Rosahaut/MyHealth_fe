*** Settings ***
Library    Browser    auto_closing_level=KEEP
Library           Collections
Library           OperatingSystem
Library           DotenvLibrary  # Lataa ympäristömuuttujat
Variables         load_env.py

*** Test Cases ***
Login to MyHealth using env.

    New Browser    chromium    headless=No
    New Page    http://localhost:5173/  

    ${USERNAME}=    Get Environment Variable    USERNAME
    ${PASSWORD}=    Get Environment Variable    PASSWORD

    [Documentation]
    Log    USERNAME: ${USERNAME}
    Log    PASSWORD:

    # Klikkaa login-modal auki
    Click    id=openLoginModal
    Wait For Elements State    id=loginModal    visible

    # Kirjoita käyttäjätunnus ja salasana
    Type Text    css=#loginModal input[name="username"]    ${USERNAME}    delay=0.1 s  
    Type Secret  css=#loginModal input[name="password"]    $PASSWORD    delay=0.1 s  

    # Klikkaa kirjautumispainiketta
    Click    css=#loginModal button.loginuser
