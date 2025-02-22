package com.parlour.booking.controller;

import com.parlour.booking.Response.CustomResponse;
import com.parlour.booking.model.User;
import com.parlour.booking.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.beans.Customizer;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<CustomResponse<User>> registerUser(@Valid @RequestBody User user) {
        try {
            User newUser = userService.registerUser(user);
            CustomResponse<User> customResponse=new CustomResponse<>(newUser,"User creation");
            return new ResponseEntity<>(customResponse,HttpStatus.OK);
           // return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
           // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            CustomResponse<User> customResponse=new CustomResponse<>(null,"Failed to create new user");
            return new ResponseEntity<>(customResponse,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
    	System.out.println(user.getId());    //id err
        try {
            User authenticatedUser = userService.authenticateUser(user.getEmail(), user.getPassword(), user.getRole());
            return ResponseEntity.ok(authenticatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(@RequestParam String email){
        System.out.println("==============================================40000000-----------");
        System.out.println(email);
        try {
//            User user = userService.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
//            return ResponseEntity.ok(user);
            User u =userService.findByEmail(email);
           // User user=optional.get();
            if(u!=null){

                return ResponseEntity.ok(u);

            }
            else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUserDetails(@Valid @RequestBody User user) {
        try {
            User updatedUser = userService.updateUserDetails(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam String email, @RequestParam String oldPassword, @RequestParam String newPassword) {
        try {
            userService.changePassword(email, oldPassword, newPassword);
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        try {
            String response = userService.forgotPassword(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        try {
            userService.resetPassword(token, newPassword);
            return ResponseEntity.ok("Password reset successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}