package com.smhrd.sesco.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.sesco.domain.Kid;
import com.smhrd.sesco.service.KidService;

@RestController
@CrossOrigin("http://localhost:3000")
public class KidController {

	@Autowired
	private KidService service;
	

//	회원ID -> 아이정보List추출
	@PostMapping("/kid/getkidlist")
	private ArrayList<Kid> getkidlist(@RequestBody Kid kid){
		String user_id = kid.getUser_id();
		return service.getKidList(user_id);
	}

}