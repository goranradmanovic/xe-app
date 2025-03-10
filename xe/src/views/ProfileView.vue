<template>
	<div class="overview grid">
		<div class="col-12">
			<h1 class="mb-1">Profile</h1>
		</div>

		<div class="lg:col-8 col-12">
			<Panel header="User Profile">
				<div class="flex flex-wrap gap-2 mb-5">
					<Avatar icon="pi pi-user" class="mr-2" size="xlarge" />

					<div class="flex-grow-1">
						<Skeleton width="90%" animation="none" />
						<Skeleton width="80%" class="my-2" animation="none" />
						<Skeleton width="50%" animation="none" />
					</div>
				</div>

				<Skeleton class="mb-3" animation="none" />
				<Skeleton width="70%" class="mb-3" animation="none" />
				<Skeleton width="50%" class="mb-3" animation="none" />
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