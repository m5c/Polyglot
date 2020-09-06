package eu.kartoffelquadrat.polyglot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

/**
 * Spring automatically implements this repository interface in a bean that has the same name (with a change in the
 * case it is called "cardRepository")
 */
public interface CardRepository extends JpaRepository<Card, Integer> {

    // Retrieve fill state of a specific vocabulary box.
    int countByBox(int box);

    //Retrieve all ids of cards in a specific box => More efficient than retrieving all cards and filtering later.
    @Query(value = "SELECT id FROM card WHERE box=?1", nativeQuery = true)
    List<Integer> findRandomInBox(int box);
}