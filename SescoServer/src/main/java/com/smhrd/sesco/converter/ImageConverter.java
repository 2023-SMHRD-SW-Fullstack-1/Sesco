package com.smhrd.sesco.converter;

import java.io.IOException;

public abstract class ImageConverter<F,S> {

	//<> : Generic , 사용자가 필요할 때 형태를 지정할 수 있음
	
		//실제 변환할 때 오버라이딩 할 추상메소드 정의
		public abstract S convert(F f) throws IOException;
}
