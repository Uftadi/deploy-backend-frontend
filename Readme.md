# Book App Erweiterung
Erweitere unsere simple Book App. Fokussiere dich vor allem auf das Backend. Um das gesamte Konzept bzw. die Zusammenarbeit von Frontend und Backend besser zu verstehen, ist es jedoch auch sinnvoll, ein paar Dinge im Frontend zu erledigen. Nachfolgend erhältst du ein paar Punkte, die du umsetzen solltest. Du kannst dir aber auch andere Dinge ausdenken.

## Mögliche Erweiterungen/Verbesserungen

### Frontend

1. **Fehlerbehandlung und Loading State im Frontend hinzufügen**:
   - Füge einen Loading-Indikator hinzu, während die Bücher geladen werden.
   - Implementiere eine Fehlermeldung, falls die Anfrage fehlschlägt.
  
2. **Buch hinzufügen Funktion**:
   - Implementiere ein Formular, um neue Bücher zum Backend hinzuzufügen.
   - Sende eine POST-Anfrage an das Backend, um das neue Buch zu speichern.

Weitere Änderungen ergeben sich aus dem Backend, wie du gleich sehen wirst.



### Backend

1. **Verbesserung der Struktur**
   - Füge zum Beispiel `Routes` hinzu 

2. **Verwendund von lowDB**
   - Benutze lowDb, um die Bücher zu verwalten
   - Aktuell werden sie ja "hard gecodet" in der `bookController.js`
   - du kannst die Struktur bzw. da Schema der Bücher gerne anpassen bzw. verändern
   
3. **Buch Validierung**:
   - Füge eine simple Validierung für die Bucheingaben im Backend hinzu. Stelle sicher, dass alle erforderlichen Felder vorhanden sind.

4. **Implementierung von Middleware**:
   - Schreibe eigene Middleware-Funktionen für Logging (z.B. Anfragen und Antworten protokollieren) und Fehlerbehandlung.
   - Integriere diese Middleware in deine Express-Anwendung.

5. **Einführung von Routen-Parametern**:
   - Erstelle eine neue Route, um Bücher anhand ihrer ID abzurufen (z.B. `GET /books/:id`).
   - Implementiere die Logik, um das entsprechende Buch aus dem Array zurückzugeben.
   - Du kannst im **Frontend** eine Möglichkeit hinzufügen, ein bestimmtes Buch abzurufen, z.B. indem man auf das Buch im Frontend klickt

6. **Delete und Update**
   - Implementiere jeweils eine Route und einen Controller für beide delete und update, also das ändern und löschen von Büchern
   - auch das kannst du zum **Frontend** hinzufügen, indem du beispielsweise einen Delete Button zu jedem Buch hinzufügst
   
     
8. **Eigene Error Middleware**
   - Füge eine eigene Middlerware hinzu, die für Fehler zuständig ist

## Deployment
Deploye den aktuellen Stand deiner App auf render.com. Versuche zusätzlich, noch andere Anbieter auszuprobieren, wie zum Beispiel:
- Heroku
- Cyclic.sh
- Vercel

Bitte beachte, das die Anbieter ihre Angebote ändern können. Das heißt, das ein oder mehrere Anbieter, die hier erwähnt werden, keine gratis Option mehr anbieten.

