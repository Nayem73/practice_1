package com.nayem.RentAnything.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        // call an internal helper method to help us expose the IDs of each Vehicle Category
        exposeIDs(config);
    }

    private void exposeIDs(RepositoryRestConfiguration config) {
        // expose entity ids
        // - get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // now create an array list of those entity types
        List<Class> entityClasses = new ArrayList<>(); // this is an empty array list
        // now - get the entity types for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // finally expose the entity ids for the array of entity/domain type
        Class[] domainTypes = entityClasses.toArray(new Class[0]); // take entity classes
                                                                        // and simply convert it to array

        config.exposeIdsFor(domainTypes); // I give it that array of classes to expose the ids for
                                                // or those given domain types

    }
}
