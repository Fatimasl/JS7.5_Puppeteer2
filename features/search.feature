Feature: Movie tests
    Scenario: Should search by text
        Given user is on "/navigation" page
        When user search by "тестировщик"
        Then user sees the course suggested "программист"

    
    Scenario: Should book the first available seat
        Given user is on go_to_the_movie page
        When user chooses the day "2"
        When user chooses first abled seances_time
        When user chooses first abled "standart" seat
        When user clicks book button
        Then user sees notice "Вы выбрали билеты:"
    
    Scenario: Should book the two seats for specific movie
        Given user is on go_to_the_movie page
        When user chooses the day "3"
        When user chooses specific seances_time "190"
        When user chooses on "5" row "5" seat
        When user chooses on "5" row "6" seat
        When user clicks book button
        Then user sees notice "Вы выбрали билеты:"
    
    Scenario: First sad path test
        Given user is on go_to_the_movie page
        When user chooses the day "4"
        When user chooses specific seances_time "198"
        When user chooses first disabled seat
        Then book button "Забронировать" is unclickable
    
    Scenario: Second sad path test
        Given user is on go_to_the_movie page
        When user chooses disabled seances_time
        Then user is on the same page and sees seans to the movie "Сталкер"  