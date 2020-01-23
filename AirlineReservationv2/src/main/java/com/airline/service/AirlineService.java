package com.airline.service;

import com.airline.model.User;

public interface AirlineService {
	public int registerUser(User user);
	public int loginUser(String userName, String password);
}
