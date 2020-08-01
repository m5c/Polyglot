package eu.kartoffelquadrat.polyglot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/dbdemo") // This means URL's start with /dbdemo
public class CardController {

    @Autowired
    private CardRepository cardRepository;

    /**
     * NOTE: POST requests must encode RequestParameters as form payload => curl: -d
     * curl localhost:8080/dbdemo/users -d name=Maex -d email=maex@kartoffelquadrat.eu
     * @ResponseBody means the returned String is the response, not a view name
     */
    @PostMapping(path = "/users")
    public @ResponseBody
    String addNewUser(@RequestParam String name
            , @RequestParam String email) {

//        User n = new User();
//        n.setName(name);
//        n.setEmail(email);
//        userRepository.save(n);
        return "Saved";
    }

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