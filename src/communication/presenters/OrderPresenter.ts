class OrderPresenter {

    public static toJson(data: any): string {
        return JSON.stringify(data)
    }
}

export { OrderPresenter }