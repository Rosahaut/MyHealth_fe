*** Settings ***
Library    Collections
Library    RequestsLibrary
Resource   Keywords.robot

Suite Setup    Create Session    url    http://localhost:3000/api/users

*** Test Cases ***

Post Create User
    ${body}=    Create Dictionary    username=${Username}    password=${Password}    email=${email}
    ${response}=    POST    url=http://localhost:3000/api/users    json=${body}    expected_status=anything

    Log    ${response.json()}

    Status Should Be    201    ${response}
