package com.lombard.app.Services;

import io.jmnarloch.spring.boot.rxjava.async.ObservableSseEmitter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;
import rx.Observable;

import java.util.concurrent.Future;

/**
 * Created by kaxa on 11/24/16.
 */
@Service
public class Service1 {


     public ObservableSseEmitter<String> messages2() {
        return new ObservableSseEmitter<String>(
                Observable.just(
                        "message 1", "message 2", "message 3"
                )
        );
    }
    @Async
    public Future<String> asyncMethod(Observable<String> observable){
        try {
            Thread.sleep(3000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        observable.just("kaxa from thread observer");
        return new AsyncResult<>("kaxa after thread sleep");
    }
}
