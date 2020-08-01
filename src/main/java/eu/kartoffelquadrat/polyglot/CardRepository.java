package eu.kartoffelquadrat.polyglot;

import org.springframework.data.jpa.repository.JpaRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

/**
 * Spring automatically implements this repository interface in a bean that has the same name (with a change in the
 * case — it is called "userRepository")
 */
public interface CardRepository extends JpaRepository<Card, Integer> {

//    Iterable<Card> findByFrench(String );

}