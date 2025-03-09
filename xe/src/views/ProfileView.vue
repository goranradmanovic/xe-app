<template>
	<div class="overview grid">
		<div class="col-12">
			<h1 class="mb-3">Profile</h1>
		</div>

		<div class="col-8">
			<Panel header="User Profile">
				<div class="flex flex-wrap gap-2 mb-5">
					<Avatar icon="pi pi-user" class="mr-2" size="xlarge" />

					<div>
						<Skeleton width="25rem" animation="none" />
						<Skeleton width="20rem" class="my-2" animation="none" />
						<Skeleton width="15rem" animation="none" />
					</div>
				</div>

				<Skeleton class="mb-3" animation="none" />
				<Skeleton width="25rem" class="mb-3" animation="none" />
				<Skeleton width="20rem" class="mb-3" animation="none" />
				<Skeleton height="2rem" class="mb-3" animation="none" />
				<Skeleton height="4rem" class="mb-3" animation="none" />
				<Skeleton height="2rem" class="mb-3" animation="none" />
				<Skeleton height="2rem" class="mb-3" animation="none" />
				<Skeleton height="6rem" class="mb-3" animation="none" />
			</Panel>
		</div>
	</div>
</template>

<script setup></script>