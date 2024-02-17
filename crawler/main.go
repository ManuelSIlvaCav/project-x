package main

import (
	"fmt"

	"github.com/PuerkitoBio/goquery"
	"github.com/geziyor/geziyor"
	"github.com/geziyor/geziyor/client"
)

type Listing struct {
	url, image, name, price string
}

func main() {
	// scraping logic...

	fmt.Println("Hello, World!")

	geziyor.NewGeziyor(&geziyor.Options{
		StartRequestsFunc: func(g *geziyor.Geziyor) {
			g.GetRendered("https://www.zoopla.co.uk/to-rent/property/bristol/?price_frequency=per_month&q=Bristol&results_sort=newest_listings&search_source=to-rent", g.Opt.ParseFunc)
		},
		ParseFunc: func(g *geziyor.Geziyor, r *client.Response) {
			fmt.Println("Parsing: ", r.Request.URL.String())

			//Find matcher for 'listing_xxx'. We use native selector id contains 'listing_'
			r.HTMLDoc.Find("div[id*='listing_']").Each(func(_ int, s *goquery.Selection) {
				fmt.Println("Found listing")
				fmt.Println(s.Attr("id"))
				fmt.Println(s.Text())
				// We find the first 'a' element and print the text it relates to the link where to find it
				s.Find("a").Each(func(_ int, a *goquery.Selection) {
					fmt.Println("Print a href")
					fmt.Println(a.Attr("href"))
				})
				// We find the list for pictures related to the listing
				s.Find("li[data-key*='gallery-slide']").Each(func(_ int, slide *goquery.Selection) {
					fmt.Println("Print a gallery-slide class")
					fmt.Println(slide.Attr("class"))
				})
			})
		},
		//BrowserEndpoint: "ws://localhost:3000",
	}).Start()

}
