package com.airline.dao;

import com.airline.model.User;

public interface AirlineDao {
	public int insertUser(User user);
	public void retrieveUser();
}
