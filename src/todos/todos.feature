Feature: Add to dos
    As a user, I want to add to dos to my list so that I remember them.
    Scenario: User visits the to do list for the first time

        Given I am on the "/todos" page
        Then the title should equal "My to dos"
        And the to do list contains 0 elements

    Scenario: User adds to dos to his list
        Given I am on the "/todos" page
        When I add a to do called "Wake up"
        Then the to do list contains 1 element

    Scenario: User cannot add empty to dos
        Given I am on the "/todos" page
        When I hit enter on the empty to do input field
        Then the to do list contains 0 elements

