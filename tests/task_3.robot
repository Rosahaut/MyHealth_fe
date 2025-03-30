*** Settings ***
Library     Browser    auto_closing_level=KEEP
Test Setup    New Browser    chromium    headless=No

*** Test Cases ***
Test Web Form Elements
    New Page    https://www.selenium.dev/selenium/web/web-form.html

    # Varmista, että sivun otsikko on oikea
    ${title}=    Get Title
    Should Be Equal As Strings    ${title}    Web form

Test text
    Type Text    css=input[name="my-text"]    TestUser    delay=0.1 s 

Test password
    Type Text    css=input[name="my-password"]    salasana123    delay=0.1 s

Test textarea
    Type Text    css=textarea[name="my-textarea"]    This is a test message.    delay=0.1 s 

Test Readonly input
    Click    [name="my-readonly"]

Test Dropdownista (select)
    Select Options By    css=select[name="my-select"]    value    2    delay=0.1 s 

Test Dropdown (datalist) -kenttä
    Type Text    css=input[name="my-datalist"]    San Francisco    delay=0.1 s 

Test File input
    Upload File By Selector    input[type="file"]    ${CURDIR}/testfile.txt

Test Checkbox
    Check Checkbox    id=my-check-1
    Check Checkbox    id=my-check-2
    Get Checkbox State    id=my-check-1    ==    checked
    Get Checkbox State    id=my-check-2    ==    checked
    Uncheck Checkbox    id=my-check-2
    Get Checkbox State    id=my-check-2    ==    unchecked    delay=0.1 s 

Test Radio button
    Click    id=my-radio-2
    Get Element States    id=my-radio-2    contains    checked
    Click    id=my-radio-1
    Get Element States    id=my-radio-1    contains    checked
    Get Element States    id=my-radio-2    not contains    checked    delay=0.1 s

Test Range 
    Drag And Drop Relative to    [type="range"]    -100    0    steps=333 

Test Date
    Type Text    css=input[name="my-date"]    2025-03-24    delay=0.1 s


Test Submit
    Click    css=button 

Test form submitted successfully
    ${message}=    Get Text    css=#message
    Should Be Equal As Strings    ${message}    Received!