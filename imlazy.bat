@ECHO OFF
REM Remember to input the parameters
REM node .
set /P TEMPERATURE="Current Temperature? "
node . "Name" "ID" "PC" "Type" "%TEMPERATURE%"
IF %ERRORLEVEL% NEQ 0 GOTO :END

:END
pause