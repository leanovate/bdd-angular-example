# if you have more than one feature file, consider putting them in a separate subdirectory "features"
Feature: My to dos
    As a user, I want <goal> so that <reason>

    Scenario: <description>
        Given I am on the "/todos" page
        Then the title should equal "My to dos"

