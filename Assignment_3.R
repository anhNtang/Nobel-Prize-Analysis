setwd('C:/Users/nguye/ITEC4220/Project')
getwd()
drugs <- read.csv("realistic_drug_labels_side_effects.csv")
head(drugs)

hist(drugs$approval_year, breaks=20, 
     main= "Number of Drugs Approved Each Year", 
     xlab = "Year", ylab = "Number of Drugs")

#plot(drugs$approval_year, drugs$price_usd)

summary(drugs$price_usd)


pbinom(3, 6, 0.25)
dbinom(12, 20, 0.7)
1 - pbinom(9, 20, 0.7)
pbinom(16,20,0.7)
pbinom(19,20, 0.7) - pbinom(11, 20, 0.7)

dbinom(8, 9, 0.7)
pbinom(3, 9, 0.4)

dgeom(6, 0.4)
1 - pgeom(5, 0.4)
dgeom(2, 0.35)
dgeom(4, 0.3)
pgeom(11, 0.3)
