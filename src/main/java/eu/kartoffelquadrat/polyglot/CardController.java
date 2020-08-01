package eu.kartoffelquadrat.polyglot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * REST controller for the Polyglot backend. All REST entry points around cards are defined here.
 *
 * @Author Maximilian Schiedermeier, Github: kartoffelquadrat
 */
@RestController
@RequestMapping(path = "/polyglot") // This means URL's start with /dbdemo
public class CardController {

    @Autowired
    private CardRepository cardRepository;

    /**
     * Retrieve meta-info for all cards
     */
    @GetMapping(path = "/")
    public @ResponseBody
    int[] getFillState() {

        // Look up how many words are stored per box. The DB has five boxes, starting at index 0.
        int[] fillState = new int[5];
        for (int i = 0; i < fillState.length; i++) {
            fillState[i] = cardRepository.countByBox(i);
        }
        return fillState;
    }

    /**
     * Retrieve all saved cards from DB: curl -X GET http://127.0.0.1:8080/polyglot/cards
     * <p>
     * Retrieve all saved cards, having a specific substring, from the DB ---NOT YET ENABLED---
     */
    @GetMapping(path = "/cards")
    public @ResponseBody
    Iterable<Card> getAllCards() {

        return cardRepository.findAll();
    }

    /**
     * Card id is generated -> not an idempotent resource. That means cards should be created with a POST on the parent
     * collection rather than with a PUT on the card-id.
     */
    @PostMapping(path = "/cards")
    public void addCard() {

        Card card = new Card();
        card.setFrench("L'amour (f)");
        card.setGerman("Die Liebe");
        card.setBox(0);
        cardRepository.save(card);
    }

    /**
     * Get details of a random card
     */
    @GetMapping("/cards/random")
    public ResponseEntity<Object> getRandomCard()
    {
        if(cardRepository.count()==0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No cards available.");

        // Minor flaw: Cards of almost empty boxes are retrieved with higher probability, compared to fuller boxes.
        List<Integer> cardIdsInBox = cardRepository.findRandomInBox(getRandomNonEmptyBox());
        int randomCardIdOfRandomBox = randomListElement(cardIdsInBox);
        return ResponseEntity.ok().body(cardRepository.findById(randomCardIdOfRandomBox));
    }


    /**
     * Returns the index of a random, non-empty box.
     * @return
     */
    private int getRandomNonEmptyBox(){

        if(cardRepository.count()==0)
            throw new RuntimeException("Cannot retrieve random non-empty box, when all boxes are empty");

        // Build a collection with the indexes of all non-empty boxes.
        List<Integer> nonEmptyBoxes = new LinkedList<>();
        int[] fillState = getFillState();
        for (int i = 0; i < fillState.length; i++) {
            if(fillState[i] > 0)
                nonEmptyBoxes.add(i);
        }

        // Select a random element, out of these non-empty boxed.
        return randomListElement(nonEmptyBoxes);
    }

    private int randomListElement(List<Integer> list)
    {
        return list.get(new Random().nextInt(list.size()));
    }


}