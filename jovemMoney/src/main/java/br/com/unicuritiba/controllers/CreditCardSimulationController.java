package br.com.unicuritiba.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.unicuritiba.models.CreditCardSimulation;
import br.com.unicuritiba.models.User;
import br.com.unicuritiba.services.CreditCardSimulationService;
import br.com.unicuritiba.services.UserService;

@RestController
@RequestMapping("/api/{userId}/credit-card-simulations")
public class CreditCardSimulationController {

    private final CreditCardSimulationService creditCardService;
    private final UserService userService;

    public CreditCardSimulationController(CreditCardSimulationService creditCardService, UserService userService) {
        this.creditCardService = creditCardService;
        this.userService = userService;
    }

    private Optional<User> getUser(Long userId) {
        return Optional.ofNullable(userService.getUserById(userId));
    }

    @GetMapping
    public ResponseEntity<List<CreditCardSimulation>> getAll(@PathVariable Long userId) {
        Optional<User> userOpt = getUser(userId);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        List<CreditCardSimulation> list = creditCardService.getAllByUser(userOpt.get());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditCardSimulation> getById(@PathVariable Long userId, @PathVariable Long id) {
        Optional<User> userOpt = getUser(userId);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        Optional<CreditCardSimulation> simOpt = creditCardService.getByIdAndUser(id, userOpt.get());
        return simOpt.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CreditCardSimulation> create(@PathVariable Long userId, @RequestBody CreditCardSimulation simulation) {
        Optional<User> userOpt = getUser(userId);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        simulation.setUser(userOpt.get());
        CreditCardSimulation saved = creditCardService.save(simulation);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CreditCardSimulation> update(@PathVariable Long userId, @PathVariable Long id,
                                                       @RequestBody CreditCardSimulation simulation) {
        Optional<User> userOpt = getUser(userId);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        Optional<CreditCardSimulation> updatedOpt = creditCardService.update(id, simulation, userOpt.get());
        return updatedOpt.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long userId, @PathVariable Long id) {
        Optional<User> userOpt = getUser(userId);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        boolean deleted = creditCardService.delete(id, userOpt.get());
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
