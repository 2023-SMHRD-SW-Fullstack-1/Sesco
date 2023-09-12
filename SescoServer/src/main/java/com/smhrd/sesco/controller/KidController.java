package com.smhrd.sesco.controller;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
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
	
	
	// 아이 프로필 등록
	@PostMapping("/kid/register")
	public boolean KidRegister(@RequestBody Kid kid) {
		
		Kid kidVO = new Kid(); 
		kidVO = service.KidRegister(kid);
		
		if(kidVO != null) {
			return true;
		} else {
			return false;
		}
		
	}
	
	//아이 프로필 수정
	@PostMapping("/kid/update")
	public JSONObject KidUpdate(@RequestBody Kid kid) {
		
		double kid_height = kid.getKid_height();
		double kid_weight = kid.getKid_weight();
		String user_id = kid.getUser_id();
		
		Kid kidVO = new Kid(kid_height, kid_weight, user_id);
		service.KidUpdate(kidVO);
		JSONObject result = new JSONObject();
		result.put("result", kidVO);
		
		return result;
		
	}
	
	
	
	
	
//	회원ID -> 아이정보List추출
	@PostMapping("/kid/getkidlist")
	private ArrayList<Kid> getkidlist(@RequestBody Kid kid){
		String user_id = kid.getUser_id();
		System.out.println("세션아이디 : "+user_id);
		return service.getKidList(user_id);
	}

}