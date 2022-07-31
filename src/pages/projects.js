import React from 'react';

import Layout from '@components/Layout/Layout';
import SEO from '@components/seo';
import ProjectItem from '@components/projects/projects';


const PresentationPage = () => (
  <Layout>
    <SEO title='Projects page' />
    
    
    <div className='container'>
    <h1>Projects</h1>
      <div>
      <ProjectItem  longDescription={'A set of tools for team development: corporate chat, Git repository, TODO boards, etc.All ecosystem services are mutually integrable.Saving resources for software deployment and integration.Ability to deploy software on your own servers, Do not waste DevOps engineers time preparing the infrastructure for product development'} address={'https://techpal.ru'} year={'2022'} description={'Software development Ecosystem'} title={'techpal.ru'}/>
      <ProjectItem  longDescription={'DevOps Hobbies is an open-source community dedicated to DevOps. With over 5000 subscribers in the Persian community, We are devoted to sharing cutting-edge knowledge and technologies with love and passion.We have created an amazing road map for DevOps and try to update it every day and we are coding new repositories corresponding to the road map in addition to our videos for current technologies in the market.'} address={'https://github.com/devopshobbies'} year={'2022'} description={'DevOps open-source community'} title={'devopshobbies'}/>
      <ProjectItem  longDescription={'An all in one intelligent and distributed system for intercom,Facility management, Security, internet service, video survelience, and IoT devices management.'} address={''} year={'2021'} description={'Smart home, IoT, Intercom, Video survelience, and facility management system'} title={'Comfortech'}/>
      <ProjectItem  longDescription={'A profile guided compiler optimization system for LLVM'} address={''} year={'2021-2022'} description={'Profile-guided Data Layout Optimization'} title={'PGDLO'}/>
      <ProjectItem  longDescription={'A location based home service application that connects the customers and the masters of the work. With this locationn based and realtime application you can find the most experts of a field arround you and make a reparing request.'} address={'https://cafebazaar.ir/app/com.PargarTeam.Karamad.Customers?l=en'} year={'2019'} description={'Home service application'} title={'Karamad'}/>
      <ProjectItem  longDescription={'A location based home service application that connects the customers and the masters of the work. With this locationn based and realtime application you can find the most experts of a field arround you and make a reparing request.'} address={"https://cafebazaar.ir/app/com.PargarTeam.Karamad.Masters?l=en"} year={'2019'} description={'Home service application'} title={'Karamad providers'}/>
      <ProjectItem  longDescription={'SHOFER Race Driver takes you deep into Middle East. Real cars, real tracks and also … . Some local music. Unlock new cars and tracks by participating in series of races and don’t worry about anything, because you’ll never be left alone, your partner lady will contact you to get you out of any trouble.'} address={"https://store.steampowered.com/app/367700/SHOFER_Race_Driver/"} year={'2016'} description={'Race Driver video game'} title={'Shofer'}/>
      <ProjectItem  longDescription={'first Iranian Online browser game AsmandeZ is a portal into the future of human race. Experience the escape from Solar System, war, peace and trade in the 29th century in the free browser-based game of AsmandeZ.'} address={"https://store.steampowered.com/app/367700/SHOFER_Race_Driver/"} year={'2013'} description={'MMO browser based game'} title={'Asmandez'}/>

      </div>
    </div>
    <div className='container'>
    <h1>Open source projects</h1>
      <div>
      <ProjectItem  longDescription={'The hexagonal architecture, or ports and adapters architecture, is an architectural pattern used in software design. It aims at creating loosely coupled application components that can be easily connected to their software environment by means of ports and adapters. This makes components exchangeable at any level and facilitates test automation.'} address={'https://github.com/MoeidHeidari/nestjs-boilerplate'} year={'2022'} description={'a boilerplate for Nodejs (Nestjs/typescript) that can be used to make http server application.'} title={'nestjs-boilerplate'}/>
      <ProjectItem  longDescription={'The intersection-over-Union app is a service that takes the coordinates of the ground truth bounding box & predicted bounding box and returns the IoU value between 0 and 1 rounded to a {number_of_decimal_palces}.'} address={'https://github.com/MoeidHeidari/intersection-over-union'} year={'2022'} description={'The intersection-over-Union app is a service that takes the coordinates of the ground truth bounding box & predicted bounding box and returns the IoU value between 0 and 1'} title={'intersection over union'}/>
      <ProjectItem  longDescription={'Log parser takes a log input file and tries to parse it to extract useful information. It also respects General Data Protection Regulation (GDPR)'} address={'https://github.com/MoeidHeidari/log-parser'} year={'2022'} description={'Log parser takes a log input file and tries to parse it to extract useful information'} title={'log parser'}/>
      <ProjectItem  longDescription={'Gibrea is a git batch repository aggregator platform that can take an input file containing thousands of repositories inside and spread the the migrations among several cores.'} address={'https://github.com/MoeidHeidari/Gibrea'} year={'2022'} description={'Gitea batch repository aggregator'} title={'Gibrea'}/>
      <ProjectItem  longDescription={'Company celebrates its company anniversary and wants to invite all customers located within a 100km radius. This repository hosts a solution implemented to meet the requirements of Parloas anniversary application'} address={'https://github.com/MoeidHeidari/Location-based-searcher'} year={'2022'} description={'Searching system based on location'} title={'Location based searcher'}/>
      <ProjectItem  longDescription={'Some sort of llvm/clang and GCC plugin passes to track Main memory reads and Writes'} address={'https://github.com/MoeidHeidari/Memory-Profiler-Read-and-Write-'} year={'2021'} description={'memory profiler developed in LLVM/Clang and GCC'} title={'Memory Profiler'}/>
      <ProjectItem  longDescription={'Non homogeneous Heat conduction equation implementation in C++.'} address={'https://github.com/MoeidHeidari/PDE'} year={'2021'} description={'Nonhomogeneous PDE - Heat Equation resolver'} title={'PDE'}/>
      <ProjectItem  longDescription={'Online shopping and a product re4commender based on trained neural networks'} address={'https://github.com/MoeidHeidari/PrestoApp'} year={'2020'} description={'Inteligent online shop'} title={'Presto'}/>
      <ProjectItem  longDescription={'Some multi-processing and multi-threading practices'} address={'https://github.com/MoeidHeidari/ParallelComputing'} year={'2020'} description={'Some multi-processing and multi-threading practices'} title={'Parallel computing practices'}/>
      <ProjectItem  longDescription={'Realtime money exchange application'} address={'https://github.com/MoeidHeidari/Realtime-money-exchange-application'} year={'2020'} description={'Realtime money exchange application'} title={'Money exchange'}/>
      <ProjectItem  longDescription={'This tiny library assists you to make your JSON objects more secure by performing encryption on values of your JSON data and adaptable with your class models whenever the purpose is to encrypt some parts of the data.'} address={'https://github.com/MoeidHeidari/MoeidCryptoMachine'} year={'2020'} description={'A simple to use Library for Encryption and decryption in android.'} title={'Crypto Machine'}/>
      <ProjectItem  longDescription={'This tiny library helps you to make your recycler views searchable.'} address={'https://github.com/MoeidHeidari/SearchableRecyclerView'} year={'2019'} description={'Searchable recycler view'} title={'Android library'}/>
      <ProjectItem  longDescription={'This library provides some utilities for getting realtime location by any exist provider.'} address={'https://github.com/MoeidHeidari/LocationTracker'} year={'2019'} description={'A useful and easy to use android location tracker.'} title={'Location Tracker'}/>
      <ProjectItem  longDescription={'This tiny library assists you make your sliders more adabtable whenever you want to get your banner images from somewhere else(by url).'} address={'https://github.com/MoeidHeidari/banner'} year={'2018'} description={'A simple to use banner slider library written in android studio.'} title={'Banner'}/>
      

      </div>
    </div>
  </Layout>
);

export default PresentationPage;