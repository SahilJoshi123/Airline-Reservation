package com.airline.dao;

import java.util.List;

import com.airline.model.FlightDetails;
import com.airline.model.FlightSearchDetails;
import com.airline.model.Flights;
import com.airline.model.LoginCredentials;
import com.airline.model.Passengers;
import com.airline.model.PaymentDetails;
import com.airline.model.SeatInfo;
import com.airline.model.Tickets;
import com.airline.model.User;

public interface AirlineDao {
	public long insertUser(User user);
	public long fetchCredentials(LoginCredentials credential);
	public List<Flights> fetchFlights(FlightSearchDetails details);
	public List<String> fetchSeats(long flightId);
	public int fetchPaymentConfirmation(PaymentDetails details);
	public int bookTicket(Tickets details);
	public void bookSeats(SeatInfo seatDetails);
	public Tickets fetchTicket(long userId);
	public Passengers fetchUser(long userId);
	public int addFlights(FlightDetails details);
}
