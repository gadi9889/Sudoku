# Sudoku
    sudoku project using MERN jwt ,bcrypt , framer motion and react router

    this project includs frontend and a backend that handels data requests and authentication

    the frontend includes 

                      signup page that requires:                                                                                                                                           first name ,last name, username, email and password

                      login that requires:                                                                                                                                                 username and passwsord
                      
                      leaderboard that displays:                                                                                                                                          rank, username, points, how many board from each difficulty were solved
                      
                      game that includs: 
                                   sudoku board
                                   check button-> shows up if the board is full ,when is pressed checks the board and corrects the user or                                                               congratulates the user
                                   menu that includes: back-> heads to the first menu and saves progress,                                                                                                    new-> generates a new board to the user and                                                                                                            reset-> resets the user progress
                      
                      menu pages: first menu-> leaderboard(leads to the leaderboard) or game(leads to the second menu)                                                                   second menu-> continue(if there is a board in the db ) or new(leads to the third menu                                                                 third menu-> hard(36 missing cells) or easy(18 missing cells)
                      
    the backend includes
    
                    data requests:
                                  get->   all the users(for the leaderboard)
                                          the displayed board (for countinue in the second menu)
                                  post->  register a new user and create a *full* sudoku board to the user (in mongodb atlas)(sign in page) 
                                  patch-> update user points and amount of board solved on successfull board completion(check is pressed)
                                          update the displayed board(with the user input) and the chosen difficulty(back is pressed) in the db
                    authentication:
                                  login-> 
                                          finding the user, using bcrypt to compare the db password to the input password and providing the user with                                           a access token and a refresh token using .sign with the secret key in the .env file
                                  verify token->                                                                                                                                                 verify the token using .verify with the secret key in the .env file
                                  token->                                                                                                                                                       regenerate the access token using .verify the refresh token with the secret regen key in the .env file
                                  
                                  logout-> revoke the users access token and regen token

    the sudoku generating algorithem
                    full board:
                                  the generation is based on random values 1-9 using .random(). the process is fill an array with the numbers 1-9 in a                                   random order,this array will represent the first row of the board. from the second row onwards the system will use                                     the same array, the system will run through each value trying to fit a number into the board, each number will be                                     tested if it fits by running three tests, scan if the number exists in the row or col or cube(3x3). if fits insert                                     into the board if not go to the next number and do the tests. after filling multiple rows the system gets stuck, the                                   current combination is not possible, the solution is delete the row refill the array with a new random order and                                       start making the row again. most of the times this is enough to generate a board but the system gets stuck again,                                     the solution is to start all over again from the beginning.
                     display board:
                                  the generation of a display board is based on the full board. the system generates random 36 positions 1-81, the                                       requirement is at least 3 blanked spots in a row(position (1-9)*(the row)). the system takes those 36 positions and                                   places the spots in a duplicate fullboard which is the display board
