import { NextFunction, Request, Response } from "express";
import { parse } from 'csv-parse';
import { off } from "process";
import { MovieModel } from "../models/movie.model";
import dayjs from 'dayjs';
import { generateEmbedding } from "../utils/embedding-generator";
import { EmbeddingModel } from "../models/embedding.model";
import ArticleModel from "../models/article.model";
export const seedBooks = async () => {
    //read the file books.csv

    //parse the csv file
    //save the data to the database

}
export const fetchNews = async () => {
    /* https://huggingface.co/datasets/valurank/News_Articles_Categorization?row=8 */
    let offset = 0;
    const initialOffset = offset;
    const length = 100;
    let data = [] as any[];
    const limit = 100;

    while (offset < initialOffset + limit) {
        const response = await fetch(`https://datasets-server.huggingface.co/rows?dataset=valurank%2FNews_Articles_Categorization&config=default&split=train&offset=${offset}&length=${length}`);
        let json = await response.json();
        if (!json || !json.features || !json.rows) {
            console.log("Breaking out of loop", json)
            break;
        }
        const fields = json.features.map((feature: any) => feature.name);

        const dataset = json.rows.map((row: any, row_index: number) => {
            return fields.reduce((acc: any, field: any, index: any) => {
                const fieldSlug = field.toLowerCase().replace(/\s/g, "_");
                acc[fieldSlug] = row.row[field];
                acc['row_idx'] = row['row_idx']
                return acc;
            }, {});
        });
        data = data.concat(dataset);
        offset += length;
    }
    console.log(offset, limit, data.length);

    //save the data to the database
    for (let i = 0; i < data.length; i++) {
        const article = await ArticleModel.findOne({
            row_idx: data[i].row_idx,
        });
        if (article) {
            //update the movie
            await ArticleModel.updateOne({
                row_idx: data[i].row_idx
            }, data[i]);

            console.log("Updated article")
        } else {
            //create the movie
            await ArticleModel.create(data[i]);
            console.log("Saved article")
        }
    }

}
export const fetchBooks = async () => {
    /* 
    https://huggingface.co/datasets/stevez80/Sci-Fi-Books-gutenberg
     */
}
export const fetchMovies = async () => {
    /* 
    https://huggingface.co/datasets/SandipPalit/Movie_Dataset
    */
    /*
    https://datasets-server.huggingface.co/rows?dataset=SandipPalit%2FMovie_Dataset&config=default&split=train&offset=100&length=100
    */

    /*
    
    {
  features: [
    { feature_idx: 0, name: 'Release Date', type: [Object] },
    { feature_idx: 1, name: 'Title', type: [Object] },
    { feature_idx: 2, name: 'Overview', type: [Object] },
    { feature_idx: 3, name: 'Genre', type: [Object] },
    { feature_idx: 4, name: 'Vote Average', type: [Object] },
    { feature_idx: 5, name: 'Vote Count', type: [Object] }
  ],
  rows: [
    { row_idx: 0, row: [Object], truncated_cells: [] },
    { row_idx: 1, row: [Object], truncated_cells: [] },
    { row_idx: 2, row: [Object], truncated_cells: [] },
    { row_idx: 3, row: [Object], truncated_cells: [] },
    { row_idx: 4, row: [Object], truncated_cells: [] },
    { row_idx: 5, row: [Object], truncated_cells: [] },
    { row_idx: 6, row: [Object], truncated_cells: [] },
    { row_idx: 7, row: [Object], truncated_cells: [] },
    { row_idx: 8, row: [Object], truncated_cells: [] },
    { row_idx: 9, row: [Object], truncated_cells: [] },
    { row_idx: 10, row: [Object], truncated_cells: [] },
    { row_idx: 11, row: [Object], truncated_cells: [] },
    { row_idx: 12, row: [Object], truncated_cells: [] },
    { row_idx: 13, row: [Object], truncated_cells: [] },
    { row_idx: 14, row: [Object], truncated_cells: [] },
    { row_idx: 15, row: [Object], truncated_cells: [] },
    { row_idx: 16, row: [Object], truncated_cells: [] },
    { row_idx: 17, row: [Object], truncated_cells: [] },
    { row_idx: 18, row: [Object], truncated_cells: [] },
    { row_idx: 19, row: [Object], truncated_cells: [] },
    { row_idx: 20, row: [Object], truncated_cells: [] },
    { row_idx: 21, row: [Object], truncated_cells: [] },
    { row_idx: 22, row: [Object], truncated_cells: [] },
    { row_idx: 23, row: [Object], truncated_cells: [] },
    { row_idx: 24, row: [Object], truncated_cells: [] },
    { row_idx: 25, row: [Object], truncated_cells: [] },
    { row_idx: 26, row: [Object], truncated_cells: [] },
    { row_idx: 27, row: [Object], truncated_cells: [] },
    { row_idx: 28, row: [Object], truncated_cells: [] },
    { row_idx: 29, row: [Object], truncated_cells: [] },
    { row_idx: 30, row: [Object], truncated_cells: [] },
    { row_idx: 31, row: [Object], truncated_cells: [] },
    { row_idx: 32, row: [Object], truncated_cells: [] },
    { row_idx: 33, row: [Object], truncated_cells: [] },
    { row_idx: 34, row: [Object], truncated_cells: [] },
    { row_idx: 35, row: [Object], truncated_cells: [] },
    { row_idx: 36, row: [Object], truncated_cells: [] },
    { row_idx: 37, row: [Object], truncated_cells: [] },
    { row_idx: 38, row: [Object], truncated_cells: [] },
    { row_idx: 39, row: [Object], truncated_cells: [] },
    { row_idx: 40, row: [Object], truncated_cells: [] },
    { row_idx: 41, row: [Object], truncated_cells: [] },
    { row_idx: 42, row: [Object], truncated_cells: [] },
    { row_idx: 43, row: [Object], truncated_cells: [] },
    { row_idx: 44, row: [Object], truncated_cells: [] },
    { row_idx: 45, row: [Object], truncated_cells: [] },
    { row_idx: 46, row: [Object], truncated_cells: [] },
    { row_idx: 47, row: [Object], truncated_cells: [] },
    { row_idx: 48, row: [Object], truncated_cells: [] },
    { row_idx: 49, row: [Object], truncated_cells: [] },
    { row_idx: 50, row: [Object], truncated_cells: [] },
    { row_idx: 51, row: [Object], truncated_cells: [] },
    { row_idx: 52, row: [Object], truncated_cells: [] },
    { row_idx: 53, row: [Object], truncated_cells: [] },
    { row_idx: 54, row: [Object], truncated_cells: [] },
    { row_idx: 55, row: [Object], truncated_cells: [] },
    { row_idx: 56, row: [Object], truncated_cells: [] },
    { row_idx: 57, row: [Object], truncated_cells: [] },
    { row_idx: 58, row: [Object], truncated_cells: [] },
    { row_idx: 59, row: [Object], truncated_cells: [] },
    { row_idx: 60, row: [Object], truncated_cells: [] },
    { row_idx: 61, row: [Object], truncated_cells: [] },
    { row_idx: 62, row: [Object], truncated_cells: [] },
    { row_idx: 63, row: [Object], truncated_cells: [] },
    { row_idx: 64, row: [Object], truncated_cells: [] },
    { row_idx: 65, row: [Object], truncated_cells: [] },
    { row_idx: 66, row: [Object], truncated_cells: [] },
    { row_idx: 67, row: [Object], truncated_cells: [] },
    { row_idx: 68, row: [Object], truncated_cells: [] },
    { row_idx: 69, row: [Object], truncated_cells: [] },
    { row_idx: 70, row: [Object], truncated_cells: [] },
    { row_idx: 71, row: [Object], truncated_cells: [] },
    { row_idx: 72, row: [Object], truncated_cells: [] },
    { row_idx: 73, row: [Object], truncated_cells: [] },
    { row_idx: 74, row: [Object], truncated_cells: [] },
    { row_idx: 75, row: [Object], truncated_cells: [] },
    { row_idx: 76, row: [Object], truncated_cells: [] },
    { row_idx: 77, row: [Object], truncated_cells: [] },
    { row_idx: 78, row: [Object], truncated_cells: [] },
    { row_idx: 79, row: [Object], truncated_cells: [] },
    { row_idx: 80, row: [Object], truncated_cells: [] },
    { row_idx: 81, row: [Object], truncated_cells: [] },
    { row_idx: 82, row: [Object], truncated_cells: [] },
    { row_idx: 83, row: [Object], truncated_cells: [] },
    { row_idx: 84, row: [Object], truncated_cells: [] },
    { row_idx: 85, row: [Object], truncated_cells: [] },
    { row_idx: 86, row: [Object], truncated_cells: [] },
    { row_idx: 87, row: [Object], truncated_cells: [] },
    { row_idx: 88, row: [Object], truncated_cells: [] },
    { row_idx: 89, row: [Object], truncated_cells: [] },
    { row_idx: 90, row: [Object], truncated_cells: [] },
    { row_idx: 91, row: [Object], truncated_cells: [] },
    { row_idx: 92, row: [Object], truncated_cells: [] },
    { row_idx: 93, row: [Object], truncated_cells: [] },
    { row_idx: 94, row: [Object], truncated_cells: [] },
    { row_idx: 95, row: [Object], truncated_cells: [] },
    { row_idx: 96, row: [Object], truncated_cells: [] },
    { row_idx: 97, row: [Object], truncated_cells: [] },
    { row_idx: 98, row: [Object], truncated_cells: [] },
    { row_idx: 99, row: [Object], truncated_cells: [] }
  ],
  num_rows_total: 48392,
  num_rows_per_page: 100,
  partial: false
}*/

    let offset = 11000;
    const initialOffset = offset;
    const length = 100;
    let data = [] as any[];
    const limit = 1000;

    while (offset < initialOffset + limit) {
        let response = await fetch(`https://datasets-server.huggingface.co/rows?dataset=SandipPalit%2FMovie_Dataset&config=default&split=train&offset=${offset}&length=${length}`);
        let json = await response.json();
        const fields = json.features.map((feature: any) => feature.name);

        const dataset = json.rows.map((row: any) => {
            return fields.reduce((acc: any, field: any, index: any) => {
                const fieldSlug = field.toLowerCase().replace(/\s/g, "_");
                acc[fieldSlug] = row.row[field];
                return acc;
            }, {});
        });
        data = data.concat(dataset);
        offset += length;
    }
    console.log(offset, limit, data.length)

    //save the data to the database
    for (let i = 0; i < data.length; i++) {
        //modify the data to convert the release date to a date object
        data[i].release_date = dayjs(data[i].release_date, 'YYYY-MM-DD').toDate();
        //modify the data to convert the genre string to an array of strings by parsing the string
        if (data[i].genre) {
            const jsonString = data[i].genre.replace(/'/g, '"');
            data[i].genre = JSON.parse(jsonString);
        }

        const movie = await MovieModel.findOne({ title: data[i].title, release_date: data[i].release_date });
        if (movie) {
            //update the movie
            await MovieModel.updateOne({ title: data[i].title, release_date: data[i].release_date }, data[i]);
            console.log("Updated movie")
        } else {
            //create the movie
            await MovieModel.create(data[i]);
            console.log("Saved movie")
        }
    }

};

export const syncEmbeddings = async () => {
    try {
        const limit = 100;
        const articles = await ArticleModel.find({
            embedding: { $exists: false }
        }).limit(limit).sort({
            createdAt: -1
        });
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            if (article.text) {
                const embedding = await generateEmbedding(article.text);
                if (embedding) {
                    article.embedding = embedding;
                    await article.save();
                    console.log("Article updated", article._id, article.row_idx)
                }
            } else {
                console.log("IGNORING: Article text not found")
            }
        }
    } catch (e) {
        console.log(e)
    }
}