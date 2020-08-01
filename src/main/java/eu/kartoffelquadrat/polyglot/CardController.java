package eu.kartoffelquadrat.polyglot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/dbdemo") // This means URL's start with /dbdemo
public class CardController {

    @Autowired
    private CardRepository cardRepository;

    /**
     * Binds to either of the following
     * curl -X GET localhost:8080/dbdemo/users
     * curl -X GET localhost:8080/dbdemo/users?name=Maex
     */
    @GetMapping(path = "/users")
    public @ResponseBody
    Iterable<Card> getAllCards(@RequestParam(required=false) String level) {
//
//        // Name was provided => get all users with that name:
//        if(name != null)
//        {
//            System.out.println("A name was provided: "+ name);
//            return userRepository.findByName(name);
//        }
//
//        // No name was provided => get all users
//        else
//        {
//            System.out.println("No name was provided, returning all users...");
//            return userRepository.findAll();
//        }
        return null;
    }
}