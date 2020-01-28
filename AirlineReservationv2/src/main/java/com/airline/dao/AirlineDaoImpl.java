package com.airline.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.airline.model.Credentials;
import com.airline.model.FlightDetails;
import com.airline.model.FlightSearchDetails;
import com.airline.model.Flights;
import com.airline.model.LoginCredentials;
import com.airline.model.Passengers;
import com.airline.model.PaymentDetails;
import com.airline.model.SeatInfo;
import com.airline.model.Seats;
import com.airline.model.Tickets;
import com.airline.model.User;

@Repository("dao")
public class AirlineDaoImpl implements AirlineDao{
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Transactional
	public long insertUser(User user) {
		String sql1 = "INSERT INTO Credentials(User_Id, User_Name, Password) VALUES(user_id_seq.NEXTVAL, :userName, :password)";
		String sql2 = "INSERT INTO Passengers(Passenger_Id, First_Name, Last_Name, Gender, Email_Id, Mobile_Number, Age)"
					+ "VALUES(user_id_seq.CURRVAL, :firstName, :lastName, :gender, :userName, :mobileNo, :age)";
		
		Query query1 = entityManager.createNativeQuery(sql1);
		query1.setParameter("userName", user.getEmailId());
		query1.setParameter("password", user.getPassword());
		
		Query query2 = entityManager.createNativeQuery(sql2);
		query2.setParameter("firstName", user.getFirstName());
		query2.setParameter("lastName", user.getLastName());
		query2.setParameter("gender", user.getGender());
		query2.setParameter("userName", user.getEmailId());
		query2.setParameter("mobileNo", user.getMobileNumber());
		query2.setParameter("age", user.getAge());
		

		int credentialResult = query1.executeUpdate();
		int userResult = query2.executeUpdate();
		
		if(userResult==1 && credentialResult == 1){
			String sql = "FROM Credentials WHERE userName = :userName";
			TypedQuery<Credentials> fetchQuery = entityManager.createQuery(sql,Credentials.class);
			fetchQuery.setParameter("userName", user.getEmailId());			
			return fetchQuery.getSingleResult().getUserId();
		}
		else{
			return 0;
		}
	}

	public long fetchCredentials(LoginCredentials credential) {
		String jpql = "SELECT c from Credentials c WHERE userName = :userName";
		TypedQuery<Credentials> query = entityManager.createQuery(jpql, Credentials.class);
		query.setParameter("userName", credential.getEmailId());
		try{
			Credentials cred =  query.getSingleResult();
			if(cred.getPassword().equals(credential.getPassword())){
				String sql = "FROM Credentials WHERE userName = :userName";
				TypedQuery<Credentials> fetchQuery = entityManager.createQuery(sql,Credentials.class);
				fetchQuery.setParameter("userName", cred.getUserName());			
				return fetchQuery.getSingleResult().getUserId();
				
			}
		}catch(Exception e){
			System.out.println("-------------------------------");
			System.out.println(e);
			return 0;
		}
		return 0;
	}

	public List<Flights> fetchFlights(FlightSearchDetails details) {
		String jpql = "SELECT f FROM Flights f WHERE source = :source "
						+ "AND destination = :destination "
						+ "AND departureDate = :departureDate "
						+ "AND availableSeats > :seats";
		TypedQuery<Flights> query = entityManager.createQuery(jpql, Flights.class);
		query.setParameter("source", details.getSource());
		query.setParameter("destination", details.getDestination());
		query.setParameter("departureDate", details.getDestinationDate());
		query.setParameter("seats", details.getSeats());
		return query.getResultList();
	}

	public List<String> fetchSeats(long flightId) {
		String jpql = "SELECT s FROM Seats s WHERE flightId = :flightId";
		TypedQuery<Seats> query = entityManager.createQuery(jpql, Seats.class);
		query.setParameter("flightId", flightId);
		List<String> seatList = new ArrayList<String>();
		List<Seats> list = query.getResultList();
		
		for (Seats seats : list) {
			seatList.add(seats.getSeatId());
		}		
		
		return seatList;
	}
	
	@Transactional
	public int fetchPaymentConfirmation(PaymentDetails details) {
		String jpql = "SELECT p from PaymentDetails p WHERE cardNumber = :cardNumber";
		String jpqlUpdate = "UPDATE PaymentDetails SET accountBalance = :balance WHERE cardNumber = :cardNumber";
		long balance = 0;
		TypedQuery<PaymentDetails> query = entityManager.createQuery(jpql, PaymentDetails.class);
		query.setParameter("cardNumber", details.getCardNumber());
		try{
			PaymentDetails account =  query.getSingleResult();
			if(account.getExpiryDate() == account.getExpiryDate() && account.getCvv() == details.getCvv() && details.getAccountBalance()<=account.getAccountBalance()){
				balance = account.getAccountBalance() - details.getAccountBalance();
				Query queryUpdate = entityManager.createQuery(jpqlUpdate);
				queryUpdate.setParameter("balance", balance);
				queryUpdate.setParameter("cardNumber", account.getCardNumber());
				return queryUpdate.executeUpdate();
		}
		}catch(Exception e){
			System.out.println(e);
			return 0;
		}
		return 0;
	}

	@Transactional
	public int bookTicket(Tickets details) {
		String sql = "INSERT INTO Tickets(Ticket_Number, Passenger_Id, Flight_Id, Departure_Date, Departure_Time, Airport_Name, Class, Number_Of_Tickets, Total_Cost, Status) "
				+ "VALUES(ticket_number_seq.NEXTVAL, :passengerId, :flightId, :departureDate, :departureTime, :airportName, :travelClass, :numberOfTickets, :totalCost, :status)";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("passengerId", details.getPassengerId());
		query.setParameter("flightId", details.getFlightId());
		query.setParameter("departureDate", details.getdepartureDate());
		query.setParameter("departureTime", details.getDepartureTime());
		query.setParameter("airportName", details.getAirportName());
		query.setParameter("travelClass", details.getTravelClass());
		query.setParameter("numberOfTickets", details.getNumberOfTickets());
		query.setParameter("totalCost", details.getTotalCost());
		query.setParameter("status", details.getStatus());
				     
		return query.executeUpdate();
	}
	
	@Transactional
	public void bookSeats(SeatInfo seatDetails){
		
		String getAvailableSeatsJpql = "From Flights WHERE flightId = :flightId";
		TypedQuery<Flights> query2 = entityManager.createQuery(getAvailableSeatsJpql, Flights.class);
		query2.setParameter("flightId", seatDetails.getFlightId());
		int availableSeats = query2.getSingleResult().getAvailableSeats()-seatDetails.getSeats().size();
		
		String updateAvailableSeatsJpql = "UPDATE Flights SET availableSeats = :availableSeats WHERE flightId = :flightId";
		
		Query query3 = entityManager.createQuery(updateAvailableSeatsJpql);
		query3.setParameter("availableSeats", availableSeats);
		query3.setParameter("flightId", seatDetails.getFlightId());
		query3.executeUpdate();
		
		for (String seat : seatDetails.getSeats()) {
			Seats seats = new Seats(seatDetails.getFlightId(), seat, seatDetails.getUserId());
			entityManager.persist(seats);
		}
	}

	public Tickets fetchTicket(long userId) {
		String jpql = "SELECT t FROM Tickets t WHERE t.passengerId = :userId";
		TypedQuery<Tickets> query = entityManager.createQuery(jpql, Tickets.class);
		query.setParameter("userId", userId);
		return query.getSingleResult();
	}

	public Passengers fetchUser(long userId) {
		String jpql = "FROM Passengers WHERE passengerId = :userId";
		TypedQuery<Passengers> query = entityManager.createQuery(jpql, Passengers.class);
		query.setParameter("userId", userId);
		Passengers user = query.getSingleResult();
		return user;
	}

	@Transactional
	public int addFlights(FlightDetails details) {
		String sql = "INSERT INTO Flights(Flight_Id, Airport_Name, Airline_Name, Source, Destination, Departure_Date, Departure_Time, Arrival_Time, Duration, Total_Seats, Available_Seats, Base_Price) "
				+ "VALUES(flight_id_seq.NEXTVAL, :airportName, :airlineName, :source, :destination, :departureDate, :departureTime, :arrivalTime, :duration, 48, 48, :basePrice)";
		
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("airportName", details.getAirportName());
		query.setParameter("airlineName", details.getAirlineName());
		query.setParameter("source", details.getSource());
		query.setParameter("destination",details.getDestination());
		query.setParameter("departureDate", details.getDepartureDate());
		query.setParameter("departureTime", details.getDepartureTime());
		query.setParameter("arrivalTime", details.getArrivalTime());
		query.setParameter("duration", details.getDuration());
		query.setParameter("basePrice", details.getBasePrice());
		return query.executeUpdate();
		
	}
}
