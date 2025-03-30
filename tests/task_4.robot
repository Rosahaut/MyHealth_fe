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

Go to Medication form
    Go To    http://localhost:5173/medication.html

Test Medication Date
    Type Text    css=input[id="date"]    28-03-2025    delay=0.1s

Test Medication Name
    Type Text    css=input[id="name"]    Kestox    delay=0.1s

Test Dosage
    Type Text    css=input[id="dosage"]    10mg    delay=0.1s

Test Taken At
    Type Text    css=input[id="taken_at"]    08:00    delay=0.1s

Test Notes
    Type Text    css=input[id="notes"]    For an allergic attack    delay=0.1s

Test Submit Medication
    Click    //button[text()='Add Medication']
    Sleep    2s  # Odotetaan tallennuksen varmistamiseksi
